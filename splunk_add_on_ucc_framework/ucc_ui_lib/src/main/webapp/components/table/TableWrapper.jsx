import React, { useState, useContext, useEffect } from 'react';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import TableFilter from '../../components/table/TableFilter';
import Table from '../../components/table/Table';
import { TableCaptionComponent } from './TableStyle';
import Select from '@splunk/react-ui/Select';
import { getUnifiedConfigs } from '../../util/util';

import PropTypes from 'prop-types';
import { TableSelectBoxWrapper } from './TableStyle';
import InputRowContext from '../../context/InputRowContext';
import { WaitSpinnerWrapper } from './TableStyle';

function TableWrapper({ isInput, serviceName }) {

    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("all");

    const { rowData, setRowData } = useContext(InputRowContext);

    useEffect(() => {
        fetchInputs();
    }, []);

    const fetchInputs = () => {
        setLoading(true);
        setTimeout(() => {
            // API call response
            const data = [[
                {
                    "name": "account",
                    "id": "https://10.202.39.212:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/account",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/account",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/account",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/account",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/account"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "disabled": false,
                        "eai:acl": null,
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "11default",
                        "interval": "1200",
                        "limit": "1000",
                        "object": "Account",
                        "object_fields": "Id,LastModifiedById,LastModifiedDate,Name",
                        "order_by": "LastModifiedDate",
                        "python.version": null,
                        "sourcetype": "sfdc:object",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "contentversion",
                    "id": "https://10.202.39.212:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/contentversion",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/contentversion",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/contentversion",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/contentversion",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/contentversion"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "disabled": false,
                        "eai:acl": null,
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "1200",
                        "limit": "1000",
                        "object": "ContentVersion",
                        "object_fields": "Id,LastModifiedById,LastModifiedDate,Title",
                        "order_by": "LastModifiedDate",
                        "python.version": null,
                        "sourcetype": "sfdc:object",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "dashboard",
                    "id": "https://10.202.39.212:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/dashboard",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/dashboard",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/dashboard",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/dashboard",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/dashboard"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "disabled": true,
                        "eai:acl": null,
                        "account": "Temp1",
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "22default",
                        "interval": "1200",
                        "limit": "1000",
                        "object": "Dashboard",
                        "object_fields": "Id,LastModifiedDate,Title",
                        "order_by": "LastModifiedDate",
                        "python.version": null,
                        "sourcetype": "sfdc:object",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "loginhistory",
                    "id": "https://10.202.39.212:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/loginhistory",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/loginhistory",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/loginhistory",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/loginhistory",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/loginhistory"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "disabled": true,
                        "eai:acl": null,
                        "account": "Other",
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "60",
                        "limit": "1000",
                        "object": "LoginHistory",
                        "object_fields": "ApiType,ApiVersion,Application,Browser,ClientVersion,Id,LoginTime,LoginType,LoginUrl,Platform,SourceIp,Status,UserId",
                        "order_by": "LoginTime",
                        "python.version": null,
                        "sourcetype": "sfdc:object",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "opportunity",
                    "id": "https://10.202.39.212:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/opportunity",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/opportunity",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/opportunity",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/opportunity",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/opportunity"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "disabled": true,
                        "eai:acl": null,
                        "account": "Dummy1",
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "1200",
                        "limit": "1000",
                        "object": "Opportunity",
                        "object_fields": "Id,LastModifiedById,LastModifiedDate,Name",
                        "order_by": "LastModifiedDate",
                        "python.version": null,
                        "sourcetype": "sfdc:object",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "report",
                    "id": "https://10.202.39.212:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/report",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/report",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/report",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/report",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/report"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "disabled": true,
                        "eai:acl": null,
                        "account": "Test",
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "1200",
                        "limit": "1000",
                        "object": "Report",
                        "object_fields": "Id,LastModifiedDate,Name",
                        "order_by": "LastModifiedDate",
                        "python.version": null,
                        "sourcetype": "sfdc:object",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "user",
                    "id": "https://10.202.39.212:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/user",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/user",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/user",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/user",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_object/user"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "disabled": true,
                        "account": "Tushar",
                        "eai:acl": null,
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "1200",
                        "limit": "1000",
                        "object": "User",
                        "object_fields": "LastModifiedDate,City,Country,FirstName,Id,IsActive,LastLoginDate,LastName,Latitude,Longitude,MobilePhone,Name,PostalCode,State,Username,UserRoleId,UserType,Email,CompanyName,ProfileId,Profile.PermissionsApiEnabled,Profile.PermissionsModifyAllData,Profile.PermissionsViewSetup",
                        "order_by": "LastModifiedDate",
                        "python.version": null,
                        "sourcetype": "sfdc:object",
                        "start_by_shell": "false"
                    }
                }
            ], [
                {
                    "name": "klrhbfka",
                    "id": "https://10.202.23.134:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/klrhbfka",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/klrhbfka",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/klrhbfka",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/klrhbfka",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/klrhbfka"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "account": "dishank",
                        "disabled": true,
                        "eai:acl": null,
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "36000",
                        "monitoring_interval": "Daily",
                        "python.version": null,
                        "sourcetype": "sfdc:logfile",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "test",
                    "id": "https://10.202.23.134:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "account": "dishank",
                        "disabled": true,
                        "eai:acl": null,
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "36000",
                        "monitoring_interval": "Daily",
                        "python.version": null,
                        "sourcetype": "sfdc:logfile",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "test123",
                    "id": "https://10.202.23.134:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test123",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test123",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test123",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test123",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test123"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "account": "dishank",
                        "disabled": true,
                        "eai:acl": null,
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "30000",
                        "monitoring_interval": "Daily",
                        "python.version": null,
                        "sourcetype": "sfdc:logfile",
                        "start_by_shell": "false"
                    }
                },
                {
                    "name": "test_hook",
                    "id": "https://10.202.23.134:8000/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test_hook",
                    "updated": "1970-01-01T00:00:00+00:00",
                    "links": {
                        "alternate": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test_hook",
                        "list": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test_hook",
                        "edit": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test_hook",
                        "remove": "/servicesNS/nobody/Splunk_TA_salesforce/Splunk_TA_salesforce_sfdc_event_log/test_hook"
                    },
                    "author": "nobody",
                    "acl": {
                        "app": "Splunk_TA_salesforce",
                        "can_list": true,
                        "can_write": true,
                        "modifiable": false,
                        "owner": "nobody",
                        "perms": {
                            "read": [
                                "admin",
                                "power",
                                "splunk-system-role",
                                "user"
                            ],
                            "write": [
                                "admin",
                                "splunk-system-role"
                            ]
                        },
                        "removable": true,
                        "sharing": "app"
                    },
                    "content": {
                        "account": "dishank",
                        "disabled": false,
                        "eai:acl": null,
                        "host": "$decideOnStartup",
                        "host_resolved": "so1",
                        "index": "default",
                        "interval": "360000",
                        "monitoring_interval": "Daily",
                        "python.version": null,
                        "sourcetype": "sfdc:logfile",
                        "start_by_shell": "false"
                    }
                }
            ]];
            modifyAPIResponse(data);
        }, 1000);
    }

    const modifyAPIResponse = (data) => {
        const unifiedConfigs = getUnifiedConfigs();
        let obj = {};
        unifiedConfigs.pages.inputs.services.forEach((service, index) => {
            if (service && service.name && data) {
                let modifiedResponse = [];
                data[index].forEach((val) => {
                    modifiedResponse.push({
                        ...val.content,
                        id: val.id,
                        name: val.name
                    });
                });
                obj[service.name] = modifiedResponse;
            }
        });
        setRowData(obj);
        setLoading(false);
    }

    /**
     * 
     * @param row {Object} row
     */
    const changeStatus = (row, index) => {

    }

    const handleFilterChange = (e, { value }) => {
        setSearchText(value);
    }

    const handleChange = (e, { value }) => {
        setSearchType(value);
    };

    const getSearchTypeDropdown = () => {
        const unifiedConfigs = getUnifiedConfigs();
        const services = unifiedConfigs.pages.inputs.services;

        let arr = [];
        arr = services.map((service) => {
            return <Select.Option label={service.title} value={service.name} />
        });

        arr.unshift(<Select.Option label="All" value="all" />);
        return arr;
    }

    /**
     * 
     * @param {Array} data 
     * This function will iterate an arrray and match each key-value with the searchText
     * It will return a new array which will match with searchText
     */
    const findByMatchingValue = (data) => {
        console.log("data: ", data);
        let arr = [];
        data.forEach((val) => {
            let found = false;
            Object.keys(val).forEach((key) => {
                if (typeof val[key] == 'string' && val[key].toLowerCase().includes(searchText.toLowerCase())) {
                    if (!found) {
                        arr.push(val);
                        found = true;
                    }
                }
            })
        });
        return arr;
    }

    const getRowData = () => {
        if (searchType == "all") {
            let arr = [];
            Object.keys(rowData).forEach((key) => {
                let newArr = [];
                if (searchText && searchText.length) {
                    newArr = findByMatchingValue(rowData[key]);
                } else {
                    newArr = rowData[key];
                }
                arr = arr.concat(newArr);
            });
            return arr;
        } else {
            return findByMatchingValue(rowData[searchType]);
        }
    }

    const filteredData = getRowData();

    return (
        <>
            {loading ? <WaitSpinnerWrapper size="large" /> :
                <>
                    <ColumnLayout gutter={8}>
                        <ColumnLayout.Row style={{
                            "borderTop": "1px solid #e1e6eb",
                            "padding": "5px 0px",
                            "marginTop": "25px"
                        }}>
                            <ColumnLayout.Column span={4}>
                                <TableCaptionComponent>
                                    <div>
                                        {filteredData.length} Input{filteredData.length > 1 && <span>s</span>}
                                        <TableSelectBoxWrapper>
                                            <Select value={searchType} onChange={handleChange}>
                                                {getSearchTypeDropdown()}
                                            </Select>
                                        </TableSelectBoxWrapper>
                                    </div>
                                </TableCaptionComponent>
                            </ColumnLayout.Column>
                            <ColumnLayout.Column span={4}>
                                <TableFilter handleChange={handleFilterChange} />
                            </ColumnLayout.Column>
                            <ColumnLayout.Column span={4}>

                            </ColumnLayout.Column>
                        </ColumnLayout.Row>
                    </ColumnLayout>

                    <Table
                        isInput={isInput}
                        serviceName={serviceName}
                        data={filteredData}
                        handleToggleActionClick={(row, index) => changeStatus(row, index)}
                    />
                </>
            }
        </>
    )
}

TableWrapper.propTypes = {
    isInput: PropTypes.boolean,
    serviceName: PropTypes.string.isRequired
};

export default TableWrapper;
