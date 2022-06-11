import React, { useState } from 'react'
import { Row, Col } from 'antd'
import './MNRCAHome.css'
import { Button, Tooltip, Form,Select } from 'antd'
import { Tabs } from 'antd'
import { Input } from 'antd'
import { ArrowLeftOutlined, MenuFoldOutlined, DownloadOutlined } from '@ant-design/icons'
import style from './Detail.module.css'

const { TextArea } = Input

const { TabPane } = Tabs
const onChange = (key) => {
  console.log(key)
}
const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]
export default function Detail(props) {
  const [RCAFacts_flag,setRCAFacts_flag]=useState(true)
  const [ReviewComments_flag,setReviewComments_flag]=useState(false)
  const [close_flag,setclose_flag]=useState(true)
  const [CloseButton,setCloseButton]=useState(true)

  return (
    <div> 
    <Tabs defaultActiveKey="1" onChange={onChange} type="card">
      <TabPane tab="RCA-Facts" key="1" style={{ color: '#131313' }}>
        <div className="RCA-Facts">
          <h2
            onClick={() => {
              setRCAFacts_flag(!RCAFacts_flag)
            }}
          >
            &gt;Online Facts
          </h2>
          {RCAFacts_flag ? (
            <div className="Online-Facts">
              <div className="RCAFacts_content">
                <div className="RCAFacts_header">
                  <Row>
                    <Col span={4}>
                      <div>
                        <div className="title_top">{props.match.params.PRID}</div>
                        <div className="title_content">
                          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                        </div>
                      </div>
                    </Col>
                    <Col span={3}>
                      <div>
                        <div className="title_top">111</div>
                        <div className="title_content">
                          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div>
                        <div className="title_top">111</div>
                        <div className="title_content">
                          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div>
                        <div className="title_top">111</div>
                        <div className="title_content">
                          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                        </div>
                      </div>
                    </Col>
                    <Col span={5}>
                      <div>
                        <div className="title_top">111</div>
                        <div className="title_content">
                          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="RCAFacts_content">
                  <Row>
                    <Col span={close_flag ? '7' : '2'}>
                      <div>
                        <div
                          className="title_top"
                          onClick={() => {
                            console.log('first')
                           setclose_flag(!close_flag)
                          }}
                        >
                          logo
                        </div>
                        {close_flag ? <div>1111</div> : <div>222</div>}
                      </div>
                    </Col>
                    <Col span={close_flag ? '17' : '22'}>
                      <div>
                        <div className="title_top">111</div>
                        <div className="main_content">
                          {CloseButton ? <TextArea style={{ maxWidth: '49%', float: 'left' }} rows={4} placeholder="maxLength is 6" /> : <TextArea style={{ maxWidth: '49.8%', float: 'left' }} rows={4} placeholder="maxLength is 6" />}
                          {CloseButton ? (
                            <div style={{ height: '100px', float: 'left', width: '2%', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center' }}>
                              <Tooltip title="点击后将内容传送至右边">
                                <ArrowLeftOutlined
                                  onClick={() => {
                                    console.log('传送')
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="收起来">
                                <MenuFoldOutlined
                                  onClick={() => {
                                    setCloseButton(!CloseButton)
                                  }}
                                />
                              </Tooltip>
                            </div>
                          ) : (
                            <Tooltip title="点击展开">
                              <div
                                onClick={() => {
                                  setCloseButton(!CloseButton)
                                }}
                                style={{ height: '100px', float: 'left', width: '0.4%' }}
                              ></div>
                            </Tooltip>
                          )}
                          {CloseButton ? <TextArea style={{ maxWidth: '49%', float: 'left' }} rows={4} placeholder="maxLength is 6" maxLength={6} /> : <TextArea style={{ maxWidth: '49.8%', float: 'left' }} rows={4} placeholder="maxLength is 6" maxLength={6} />}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={close_flag ? '7' : '2'}>
                      <div>{close_flag ? <div>1111</div> : <div>222</div>}</div>
                    </Col>
                    <Col span={close_flag ? '17' : '22'}>
                      <div>
                        <div className="main_content">
                          {CloseButton ? <TextArea style={{ maxWidth: '49%', float: 'left' }} rows={4} placeholder="maxLength is 6" /> : <TextArea style={{ maxWidth: '49.8%', float: 'left' }} rows={4} placeholder="maxLength is 6" />}
                          {CloseButton ? (
                            <div style={{ height: '100px', float: 'left', width: '2%', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center' }}>
                              <Tooltip title="点击后将内容传送至右边">
                                <ArrowLeftOutlined
                                  onClick={() => {
                                    console.log('传送')
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="收起来">
                                <MenuFoldOutlined
                                  onClick={() => {
                                    setCloseButton(!CloseButton)
                                  }}
                                />
                              </Tooltip>
                            </div>
                          ) : (
                            <Tooltip title="点击展开">
                              <div
                                onClick={() => {
                                  setCloseButton(!CloseButton)
                                }}
                                style={{ height: '100px', float: 'left', width: '0.4%' }}
                              ></div>
                            </Tooltip>
                          )}
                          {CloseButton ? <TextArea style={{ maxWidth: '49%', float: 'left' }} rows={4} placeholder="maxLength is 6" maxLength={6} /> : <TextArea style={{ maxWidth: '49.8%', float: 'left' }} rows={4} placeholder="maxLength is 6" maxLength={6} />}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={close_flag ? '7' : '2'}>
                      <div>{close_flag ? <div>1111</div> : <div>222</div>}</div>
                    </Col>
                    <Col span={close_flag ? '17' : '22'}>
                      <div>
                        <div className="main_content">
                          <Form className="Form_content">
                            <Form.Item>
                              <Select options={areas} />
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            ) : (
              ''
            )}
          {/* Review Comments 部分 */}
          <h2
            onClick={() => {
              setReviewComments_flag(!ReviewComments_flag)
            }}
          >
            &gt;Review Comments
          </h2>
          {ReviewComments_flag ? <div className="Review-Comments">123212121</div> : ''}
          <Button onClick={()=>{
            props.history.push('/MNRCAHome')
          }} type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>
            save
          </Button>
          <Button
            onClick={() => {
              console.log('first')
            }}
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={'large'}
          >
            RCA-Facts Done
          </Button>
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>
            VersionHistory
          </Button>
        </div>
      </TabPane>
      <TabPane tab="RCA" key="2">
        <div className="RCA">
          <h2
            onClick={() => {
              setRCAFacts_flag(!RCAFacts_flag)
            }}
          >
            &gt;Online RCA
          </h2>
          {RCAFacts_flag ? (
            <div className="Online-RCA">
              <div className="RCA_box">
                <table style={{ maxWidth: '5000px', width: '4500px' }}>
                  <tbody style={{ display: 'table-row-group', vertialAlign: 'middle' }}>
                    <tr>
                      {CloseButton ? (
                        <th style={{ width: '100px', backgroundColor: 'blue' }}>
                          <Tooltip title="收起来">
                            <MenuFoldOutlined
                              onClick={() => {
                                setCloseButton(!CloseButton)
                              }}
                            />
                          </Tooltip>
                        </th>
                      ) : (
                        <th style={{ width: '30px', backgroundColor: 'red' }}>
                          <Tooltip title="展开">
                            <MenuFoldOutlined
                              onClick={() => {
                                setCloseButton(!CloseButton)
                              }}
                            />
                          </Tooltip>
                        </th>
                      )}
                      <th className="tiltle_th">Why1</th>
                      <th className="tiltle_th">Why2</th>
                      <th className="tiltle_th">Why3</th>
                      {<th className="tiltle_th">Why4</th>}
                      {<th className="tiltle_th">Why5</th>}
                      <th className="tiltle_th">Root Cause</th>
                      <th className="tiltle_th">Action Propoasl</th>
                      <th className="tiltle_th">Root Cause Category</th>
                      <th className="tiltle_th">Root Cause Subcategory</th>
                      <th className="tiltle_th">RCA Action type</th>
                      <th className="tiltle_th">Assigned To</th>
                      <th className="tiltle_th">RCA AI ID</th>
                      <th className="tiltle_th">Completion Target Date</th>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                      {CloseButton ? <td style={{ width: '100px', backgroundColor: 'red' }}>111</td> : <td style={{ width: '30px', backgroundColor: 'red' }}>111</td>}
                      <td className={style.ContentTd}>111
                        <div style={{ display: 'flex', height: '200px' }}>
                          <div style={{ alignSelf: 'flex-end', marginLeft: 'auto' }}>2</div>
                          <div style={{ textAlign: 'right', alignSelf: 'center' }}>1</div>
                          {/* <div>1</div> */}
                        </div>
                      </td>
                      <td className={style.ContentTd}>111</td>
                      <td className={style.ContentTd}>111</td>
                      <td className={style.ContentTd}>111</td>
                      <td className={style.ContentTd}>111</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* Review Comments 部分 */}
          <h2
            onClick={() => {
              setReviewComments_flag(!ReviewComments_flag)
            }}
          >
            &gt;Review Comments
          </h2>
          {ReviewComments_flag ? <div className="Review-Comments">123212121</div> : ''}
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>
            save
          </Button>
          <Button
            onClick={() => {
              console.log('1111')
            }}
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={'large'}
          >
            RCA-Facts Done
          </Button>
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>
            VersionHistory
          </Button>
        </div>
      </TabPane>
      <TabPane tab="EDA" key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="SUMMARY" key="4">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>

</div>
  )
}
