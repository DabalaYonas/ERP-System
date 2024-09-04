import React from 'react';
import {Col, List, Row, Space, Switch } from 'antd';
import MyTypography from '../MyTypography';
import { DescText } from '../DecriptionText';

const NotificationSettings = () => {
    return <>
    <Space 
      direction='vertical'
      size="large">
   
      <Row>
          <Col span={18}>
            <MyTypography level={3}>Account Notification</MyTypography>
            <DescText>We will send you notifications to inform you of any updates and/or changes as event occur for you or your business in HavenERP. Select which notifications you want to recieve below:</DescText>
          </Col>
          <Col span={24}>
            <List bordered>
              <List.Item actions={[<Switch />]}>
                <List.Item.Meta title={<MyTypography level={4}>Leave</MyTypography>}
                description="When relevant leave-related activity accurs such as when an leave is requested by employee.">
  
                </List.Item.Meta>
              </List.Item>
              <List.Item actions={[<Switch />]}>
                <List.Item.Meta title={<MyTypography level={4}>Recruitment</MyTypography>}
                description="When relevant recruitment-related activity accurs such as when new applicant.">
  
                </List.Item.Meta>
              </List.Item>
            </List>
          </Col>
      </Row>
      
      <Row>
          <Col span={18}>
            <MyTypography level={3}>Email Notification</MyTypography>
            <DescText>We will send you notifications to inform you of any updates and/or changes as event occur for you or your business in HavenERP. Select which notifications you want to recieve below:</DescText>
          </Col>
          <Col span={24}>
            <List bordered>
              <List.Item actions={[<Switch />]}>
                <List.Item.Meta title={<MyTypography level={4}>Leave</MyTypography>}
                description="When relevant leave-related activity accurs such as when an leave is requested by employee.">
  
                </List.Item.Meta>
              </List.Item>
              <List.Item actions={[<Switch />]}>
                <List.Item.Meta title={<MyTypography level={4}>Recruitment</MyTypography>}
                description="When relevant recruitment-related activity accurs such as when new applicant.">
  
                </List.Item.Meta>
              </List.Item>
            </List>
          </Col>
      </Row>
          
    </Space>
    </>
  }

  export default NotificationSettings;