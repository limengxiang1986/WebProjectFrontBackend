import React, { Component } from 'react'
import { Layout, Select, Tag, Table } from 'antd'
import './MNRCAHome.css'
import { Button, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';
import axios from '../axios/axios';
const { Sider, Content } = Layout
const { Option } = Select

const { TabPane } = Tabs
const onChange = (key) => {
  console.log(key)
}
const handleChange = (value) => {
  console.log(`selected ${value}`)
}
const aaa = [
  { value: 'china', label: 'China' },
  { value: 'usa', label: 'USA' },
  { value: 'japan', label: 'Japan' },
  { value: 'korea', label: 'Korea' },
  { value: 'EC', label: 'EDF' },
  { value: 'dog', label: 'DOG' },
]
const columns = [
  {
    title: 'FRID',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'FR-Title',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'FR-Severity',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Jiralssueld',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiralssueParentId',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'PRAttached',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueType',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueType',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueCaseType',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueStatus',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueOverDue',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueOpenDays',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueCreatedDate',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueParentCreatedDate',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueResolutionDate',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueParentResolutionDate',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueAssignee',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'PRRcaEdaAssessor',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueAssignee',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueAssigneeTribe',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueAssigneeSquadGroup',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'JiraIssueAssigneeSquadGroupLead',
    dataIndex: 'address',
    key: 'address',
  },
]
const data = []
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: i,
    age: 32,
    address: <a href="https://master_mj.gitee.io/master_blog/ ">`London, Park Lane no. ${i}`</a>,
  })
}

export default class MnrcaHome extends Component {
  state = {
    flag: '',
    URL: '',
    RCAFacts_flag: true,
    ReviewComments_flag: false,
    close_flag: true,
    function_button_1: true,
    function_button_2: true,
    function_button_3: true,
    function_button_4: true,
    function_button_5: true,
    function_button_6: true,
    close_button: false,
  }
  render() {
    axios.post('/user', {
          username: 'user',
          password:  '123'
      }
    )
    .then(response => {
        this.setState({flagLoader: false});
        if (response.status === 200){
            console.log(response.data)
        }
    })
    .catch(error => {
      console.log('error')
    })
    return (
      <div> 
          <Layout>
            <Sider className="sider">
              <div className="sider-button">
                <Button shape="round" style={{ backgroundColor: '#8195b2', width: '180px' }}>
                  Task Assigin to My Triberesponse.data
                </Button>
                <Button shape="round" style={{ backgroundColor: '#8195b2', width: '180px' }}>
                  Task Assigin to My SG
                </Button>
                <Button shape="round" style={{ backgroundColor: '#8195b2', width: '180px' }}>
                  Task Assigin to My ME
                </Button>
                <Button shape="round" style={{ backgroundColor: '#8195b2', width: '180px' }}>
                  ALL TASK
                </Button>
              </div>
              <div className="sider-select">
                <div className="select_1">
                  <div style={{ height: '32px', width: '180px', backgroundColor: '#0097db', textAlign: 'center', margin: 'auto' }}>Task Assign To Tribe</div>
                  <Select
                    onSelect={(e) => {
                    }}
                    mode="multiple"
                    style={{
                      width: '140px',
                      height: 300,
                      marginTop: '10px',
                    }}
                    placeholder="select one country"
                    defaultValue={['china']}
                    onChange={handleChange}
                    optionLabelProp="label"
                  >
                    {aaa &&
                      aaa.map((item) => (
                        <Option value={item.value} label={item.label} key={item.label}>
                          {item.value}
                        </Option>
                      ))}
                  </Select>
                  <Button>
                    <SearchOutlined />
                  </Button>
                </div>
                <div className="select_2">
                  <div style={{ height: '32px', width: '180px', backgroundColor: '#0097db', textAlign: 'center', margin: 'auto' }}>Task Assign To Tribe</div>
                  <Select
                    onSelect={(e) => {
                      // console.log(e.value)
                    }}
                    mode="multiple"
                    style={{
                      width: '140px',
                      height: 300,
                      marginTop: '10px',
                    }}
                    placeholder="select one country"
                    defaultValue={['china']}
                    onChange={handleChange}
                    optionLabelProp="label"
                  >
                    {aaa &&
                      aaa.map((item) => (
                        <Option value={item.value} label={item.label} key={item.label}>
                          {item.value}
                        </Option>
                      ))}
                  </Select>
                  <Button>
                    <SearchOutlined />
                  </Button>
                </div>
              </div>
            </Sider>
            <Content className="content">
              <Tabs onChange={onChange} type="card">
                <TabPane tab="RCA Task" key="1">
                  <div className="TabPane-content">
                    <div className="Tag-content">
                      <h2 style={{ color: '#d2691e', fontSize: '27px', marginBottom: '15px' }}>Task Assign To NSB MN RAN L2 SW 3 CN </h2>
                      <Tag color="#2db7f5">Open</Tag>
                      <Tag color="#87d068">Close</Tag>
                      <Tag color="#108ee9">All</Tag>
                    </div>
                    <Tooltip title="双击进入" placement="leftTop">
                      <div className="Table-content">
                        <Table
                          onRow={(record) => {
                            return {
                              onDoubleClick: (event) => {
                                this.props.history.push(`/detail/${record.key}`)
                              },
                            }
                          }}
                          scroll={{ x: '100%' }}
                          columns={columns}
                          pagination={{
                            pageSize: 6,
                          }}
                          dataSource={data}
                        />
                      </div>
                    </Tooltip>
                  </div>
                </TabPane>
                <TabPane tab="EDA Tasks" key="2">
                  <div className="TabPane-content">
                    <div className="Tag-content">
                      <Tag color="#2db7f5">Open</Tag>
                      <Tag color="#87d068">Close</Tag>
                      <Tag color="#108ee9">All</Tag>
                      <h2 style={{ color: '#d2691e', fontSize: '27px', marginTop: '10px', marginBottom: '15px' }}>Task Assign To NSB MN RAN L2 SW 3 CN </h2>
                    </div>
                    <div className="Table-content">
                      <Table
                        scroll={{ x: '100%' }}
                        columns={columns}
                        pagination={{
                          pageSize: 6,
                        }}
                        dataSource={data}
                      />
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Action Propoasl" key="3">
                  <div className="TabPane-content">
                    <div className="Tag-content">
                      <Tag color="#2db7f5">Open</Tag>
                      <Tag color="#87d068">Close</Tag>
                      <Tag color="#108ee9">All</Tag>
                      <h2 style={{ color: '#d2691e', fontSize: '27px', marginTop: '10px', marginBottom: '15px' }}>Task Assign To NSB MN RAN L2 SW 3 CN </h2>
                    </div>
                    <div className="Table-content">
                      <Table
                        scroll={{ x: '100%' }}
                        columns={columns}
                        pagination={{
                          pageSize: 6,
                        }}
                        expandable={{
                          expandedRowRender: (record) => (
                            <p
                              style={{
                                margin: 0,
                              }}
                            >
                              {record.description}
                            </p>
                          ),
                          rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                        dataSource={data}
                      />
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="ALL" key="4">
                  <div className="TabPane-content">
                    <div className="Tag-content">
                      <Tag color="#2db7f5">Open</Tag>
                      <Tag color="#87d068">Close</Tag>
                      <Tag color="#108ee9">All</Tag>
                      <h2 style={{ color: '#d2691e', fontSize: '27px', marginTop: '10px', marginBottom: '15px' }}>Task Assign To NSB MN RAN L2 SW 3 CN </h2>
                    </div>
                    <div className="Table-content">
                      <Table
                        onRow={(record) => {
                          return {
                            onClick: (event) => {
                              console.log(event)
                            }, // 点击行
                            onDoubleClick: (event) => {},
                            onContextMenu: (event) => {},
                            onMouseEnter: (event) => {}, // 鼠标移入行
                            onMouseLeave: (event) => {},
                          }
                        }}
                        scroll={{ x: '100%' }}
                        columns={columns}
                        pagination={{
                          pageSize: 6,
                        }}
                        expandable={{
                          expandedRowRender: (record) => (
                            <p
                              style={{
                                margin: 0,
                              }}
                            >
                              {record.description}
                            </p>
                          ),
                          rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                        dataSource={data}
                      />
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </Content>
          </Layout>
      </div>
    )
  }
}
