__version__ = "0.1.0"

import logging
import os
import glob
from os import system
import shutil
import argparse
import json
from .uccrestbuilder.global_config import (
    GlobalConfigBuilderSchema,
    GlobalConfigPostProcessor,
)
from .uccrestbuilder import build
from .start_alert_build import alert_build

from jinja2 import Environment, FileSystemLoader

outputdir = os.path.join(os.getcwd(), "output")
sourcedir = os.path.dirname(os.path.realpath(__file__))

j2_env = Environment(
    loader=FileSystemLoader(os.path.join(sourcedir, "templates"))
)


def recursive_overwrite(src, dest, ignore=None):
    if os.path.isdir(src):
        if not os.path.isdir(dest):
            os.makedirs(dest)
        files = os.listdir(src)
        if ignore is not None:
            ignored = ignore(src, files)
        else:
            ignored = set()
        for f in files:
            if f not in ignored:
                recursive_overwrite(
                    os.path.join(src, f), os.path.join(dest, f), ignore
                )
    else:
        if os.path.exists(dest):
            os.remove(dest)
        shutil.copy(src, dest)


def clean_before_build(args):

    logging.warning("Cleaning out directory " + outputdir)
    shutil.rmtree(os.path.join(outputdir), ignore_errors=True)
    os.makedirs(outputdir)
    logging.warning("Cleaned out directory " + outputdir)


def copy_package_source(args, ta_name):
    logging.warning("Copy package directory " + args.source)
    recursive_overwrite(args.source, os.path.join(outputdir, ta_name))


def export_package(args, ta_name):
    logging.warning("Exporting package")
    recursive_overwrite(os.path.join(outputdir, ta_name), args.source)


def copy_package_template(args, ta_name):
    logging.warning("Copy template directory")
    recursive_overwrite(
        os.path.join(sourcedir, "package"), os.path.join(outputdir, ta_name)
    )


def replace_token(args, ta_name):
    # replace token in template
    logging.warning("Replace tokens in views")
    views = ["inputs.xml", "configuration.xml", "redirect.xml"]
    for view in views:
        template_dir = os.path.join(
            outputdir, ta_name, "default", "data", "ui", "views"
        )
        with open(os.path.join(template_dir, view)) as f:
            s = f.read()

        # Safely write the changed content, if found in the file
        with open(os.path.join(template_dir, view), "w") as f:
            s = s.replace("${package.name}", ta_name)
            if view == "redirect.xml":
                s = s.replace("${ta.name}", ta_name.lower())
            f.write(s)


def install_libs(args, lib_dest, py2=False, py3=False):
    if not os.path.exists(lib_dest):
        os.makedirs(lib_dest)
    if py3:
        install_cmd = (
            "pip3 install -r "
            + args.py3_requirements
            + " --no-compile --no-binary :all: --target "
            + lib_dest
        )
        os.system(install_cmd)
    if py2:
        install_cmd = (
            "pip2 install -r "
            + args.py2_requirements
            + " --no-compile --no-binary :all: --target "
            + lib_dest
        )
        os.system(install_cmd)
    remove_files(lib_dest)


def install_libs_py2(args, ta_name):

    lib_dest = os.path.join(outputdir, ta_name, "lib", "ucc_py2")
    os.makedirs(lib_dest)
    os.system(
        "pip2 install future"
        + " --no-compile --no-binary :all: --target "
        + lib_dest
    )
    os.system(
        "pip2 install six"
        + " --no-compile --no-binary :all: --target "
        + lib_dest
    )
    os.system(
        "pip2 install httplib2"
        + " --no-compile --no-binary :all: --target "
        + lib_dest
    )
    remove_files(lib_dest)


def install_libs_py3(args, ta_name):

    lib_dest = os.path.join(outputdir, ta_name, "lib", "ucc_py3")
    os.makedirs(lib_dest)
    os.system(
        "pip3 install httplib2"
        + " --no-compile --no-binary :all: --target "
        + lib_dest
    )
    remove_files(lib_dest)

def remove_files(path):
    rmdirs = glob.glob(os.path.join(path, "*.egg-info")) + glob.glob(os.path.join(path, "*.dist-info"))
    for rmdir in rmdirs:
        shutil.rmtree(rmdir)

def copy_splunktaucclib(args, ta_name):
    logging.warning("Copy splunktaucclib directory ")
    recursive_overwrite(
        os.path.join(sourcedir, "splunktaucclib"),
        os.path.join(outputdir, ta_name, "lib", "splunktaucclib"),
    )


def generate_rest(args, ta_name, scheme, import_declare_name):
    build(
        scheme,
        "splunktaucclib.rest_handler.admin_external.AdminExternalHandler",
        os.path.join(outputdir, ta_name),
        j2_env,
        post_process=GlobalConfigPostProcessor(),
        import_declare_name=import_declare_name,
    )


def is_oauth_configured(ta_tabs):
    # check if oauth is configured in globalConfig.json
    for tab in ta_tabs:
        if tab["name"] == "account":
            for elements in tab["entity"]:
                if elements["type"] == "oauth":
                    return True
            break
    return False


def replace_oauth_html_template_token(args, ta_name, ta_version):
    html_template_path = os.path.join(
        outputdir, ta_name, "appserver", "templates"
    )
    with open(os.path.join(html_template_path, "redirect.html")) as f:
        s = f.read()

    # Safely write the changed content, if found in the file
    with open(os.path.join(html_template_path, "redirect.html"), "w") as f:
        # replace addon name in html template
        s = s.replace("${ta.name}", ta_name.lower())
        # replace addon version in html template
        s = s.replace("${ta.version}", ta_version)
        f.write(s)


def modify_and_replace_token_for_oauth_templates(
    args, ta_name, ta_tabs, ta_version
):
    redirect_xml_src = os.path.join(
        outputdir, ta_name, "default", "data", "ui", "views", "redirect.xml"
    )
    # if oauth is configured replace token in html template and rename the templates with respect to addon name
    if is_oauth_configured(ta_tabs):
        replace_oauth_html_template_token(args, ta_name, ta_version)

        redirect_js_src = os.path.join(
            outputdir, ta_name, "appserver", "static", "js", "build", "redirect_page.js"
        )
        redirect_js_dest = (
            os.path.join(outputdir, ta_name, "appserver", "static", "js", "build", "")
            + ta_name.lower()
            + "_redirect_page."
            + ta_version
            + ".js"
        )
        redirect_html_src = os.path.join(
            outputdir, ta_name, "appserver", "templates", "redirect.html"
        )
        redirect_html_dest = (
            os.path.join(outputdir, ta_name, "appserver", "templates")
            + ta_name.lower()
            + "_redirect.html"
        )
        redirect_xml_dest = (
            os.path.join(outputdir, ta_name, "default", "data", "ui", "views")
            + ta_name.lower()
            + "_redirect.xml"
        )

        os.rename(redirect_js_src, redirect_js_dest)
        os.rename(redirect_html_src, redirect_html_dest)
        os.rename(redirect_xml_src, redirect_xml_dest)
    # if oauth is not configured remove the redirect.xml template
    else:
        os.remove(redirect_xml_src)


def add_modular_input(
    args, ta_name, schema_content, import_declare_name, j2_env
):

    services = schema_content.get("pages").get("inputs").get("services")
    for service in services:
        input_name = service.get("name")
        class_name = input_name.upper()
        description = service.get("title")
        entity = service.get("entity")
        field_white_list = ["name", "index", "sourcetype"]
        # filter fields in white list
        entity = [x for x in entity if x.get("field") not in field_white_list]
        import_declare = "import " + import_declare_name

        content = j2_env.get_template("input.template").render(
            import_declare=import_declare,
            input_name=input_name,
            class_name=class_name,
            description=description,
            entity=entity,
        )
        input_file_name = os.path.join(
            outputdir, ta_name, "bin", input_name + ".py"
        )
        with open(input_file_name, "w") as input_file:
            input_file.write(content)


def make_modular_alerts(args, ta_name, ta_namespace, schema_content):
    if schema_content.get("alerts"):

        alert_build(
            {"alerts": schema_content["alerts"]},
            ta_name,
            ta_namespace,
            outputdir,
            sourcedir,
        )


def main():
    parser = argparse.ArgumentParser(description="Build the add-on")
    requirements_group = parser.add_mutually_exclusive_group()
    parser.add_argument(
        "--source",
        type=str,
        help="Folder containing the app.manifest and app source",
        default="package",
    )
    parser.add_argument(
        "--config",
        type=str,
        help="Path to configuration file",
        required=True,
    )
    requirements_group.add_argument(
        "--py2-requirements",
        type=str,
        help="Install libraries in addon using python2",
    )
    requirements_group.add_argument(
        "--py3-requirements",
        type=str,
        help="Install libraries in addon using python3",
    )
    parser.add_argument(
        "--path-requirements",
        type=str,
        help="Path in addon to install 3rd Party libs",
        default="lib"
    )
    parser.add_argument(
        "--exclude",
        nargs='*',
        choice=['modular_alerts', 'modular_input', 'oauth', 'py2_libs', 'py3_libs', 'rest_files', 'splunktaucclib'],
        help="Modules not to generate",
        default=""
    )
    args = parser.parse_args()
    clean_before_build(args)

    with open(os.path.join(args.source, "app.manifest"), "r") as f:
        data = json.load(f)
    with open(args.config, "r") as f:
        schema_content = json.load(f)

    scheme = GlobalConfigBuilderSchema(schema_content, j2_env)
    ta_name = schema_content.get("meta").get("name")
    ta_version = schema_content.get("meta").get("version")
    ta_tabs = schema_content.get("pages").get("configuration").get("tabs")
    ta_namespace = schema_content.get("meta").get("restRoot")
    import_declare_name = "import_declare_test"

    logging.warning("Package ID is " + ta_name)

    copy_package_template(args, ta_name)
    lib_dest = os.path.join(outputdir, ta_name, args.path_requirements)
    if args.py3_requirements and os.path.exists(args.py3_requirements):
        install_libs(args, lib_dest, py3=True)
    elif args.py2_requirements and os.path.exists(args.py2_requirements):
        install_libs(args, lib_dest, py2=True)
    elif args.py3_requirements or args.py2_requirements:
        raise FileNotFoundError("Unable to find requirements file")
    
    exclude_list = args.exclude.split(",")
    if not "py2_libs" in exclude_list:
        install_libs_py2(args, ta_name)
    if not "py3_libs" in exclude_list:
        install_libs_py3(args, ta_name)
    if not "splunktaucclib" in exclude_list:
        copy_splunktaucclib(args, ta_name)

    shutil.copyfile(
        args.config,
        os.path.join(outputdir, ta_name, "appserver", "static", "js", "build", "globalConfig.json",
        ),
    )
    replace_token(args, ta_name)

    if not "rest_files" in exclude_list:
        generate_rest(args, ta_name, scheme, import_declare_name)
    if not "oauth" in exclude_list:
        modify_and_replace_token_for_oauth_templates(
            args, ta_name, ta_tabs, schema_content.get('meta').get('version')
        )
    if not "modular_input" in exclude_list:
        add_modular_input(
            args, ta_name, schema_content, import_declare_name, j2_env
        )
    if not "modular_alerts" in exclude_list:
        make_modular_alerts(args, ta_name, ta_namespace, schema_content)
    copy_package_source(args, ta_name)
    export_package(args, ta_name)


def setup_env():
    logging.info("Setting up Environment")
    install_npm_dependencies = "npm install -g bower"
    os.system(install_npm_dependencies)
    os.chdir(os.path.join(sourcedir, "UCC-UI-lib", "bower_components", "SplunkWebCore"))
    os.system("npm install")
    


def generate_static_files():
    logging.info("Generating Static files")
    os.chdir(os.path.join(sourcedir, "UCC-UI-lib"))
    os.system("npm install")
    os.system("bower install")
    os.system("npm run build")


def migrate_package():
    logging.info("Exporting generated Package.")
    src = os.path.join(os.path.join(sourcedir, "UCC-UI-lib", "build"))
    dest = os.path.join(os.path.join(sourcedir, "package"))
    if os.path.exists(dest):
        shutil.rmtree(dest, ignore_errors=True)
    os.makedirs(dest)
    recursive_overwrite(src, dest)


def build_ucc():
    setup_env()
    generate_static_files()
    migrate_package()

def install_requirements():
    """
    Install libraries in add-on.  
    """
    parser = argparse.ArgumentParser(description="Build the add-on")
    requirements_group = parser.add_mutually_exclusive_group(required=True)
    parser.add_argument(
        "--path-requirements",
        type=str,
        help="Path in addon to install 3rd Party libs",
        default="lib"
    )
    requirements_group.add_argument(
        "--py2-requirements",
        type=str,
        help="Install libraries in addon using python2",
    )
    requirements_group.add_argument(
        "--py3-requirements",
        type=str,
        help="Install libraries in addon using python3",

    )
    args = parser.parse_args()
    lib_dest = os.path.join(args.path_requirements)
    if args.py3_requirements and os.path.exists(args.py3_requirements):
        install_libs(args, lib_dest, py3=True)
    elif args.py2_requirements and os.path.exists(args.py2_requirements):
        install_libs(args, lib_dest, py2=True)
    else:
        raise FileNotFoundError("Unable to find requirements file")
