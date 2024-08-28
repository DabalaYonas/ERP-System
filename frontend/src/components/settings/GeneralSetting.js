import React from 'react';
import { AutoComplete, Col, Divider, Radio, Row, Select } from 'antd';
import MyTypography from '../../components/MyTypography';
import { DescText } from '../../components/DecriptionText';

const GeneralSetting = () => {
    return <>
    <Row>
      <Col span={24}>
        <MyTypography level={4}>Theme</MyTypography>
        <DescText>This theme applies in all pages.</DescText>
      </Col>
      <Col span={24}>
        <Radio.Group className='p-3' defaultValue={1}>
          <Radio value={1}>System Default</Radio>
          <Radio value={2}>Light</Radio>
          <Radio value={3}>Dark</Radio>
        </Radio.Group>
      </Col>
      <Divider />
      <Col span={24}>
        <MyTypography level={4}>Language Preference</MyTypography>
        <DescText>Choose the language you prefer.</DescText>
      </Col>
      <Col span={12}>
        <Select size='large' defaultValue={1} style={{width: "100%"}} placeholder="Language">
          <Select.Option value={1}>English (United State)</Select.Option>
          <Select.Option value={2}>አማርኛ (Amharic)</Select.Option>
          <Select.Option value={3}>Afaan Oromoo</Select.Option>
        </Select>
      </Col>
      <Divider />
      <Col span={24}>
        <MyTypography level={4}>Timezone</MyTypography>
        <DescText>Select time zone.</DescText>
      </Col>
      <Col span={12}>
        <AutoComplete size='large' style={{width: "100%"}} placeholder="Time Zone">
          <AutoComplete.Option value="Addis Ababa (GMT +3:00)"></AutoComplete.Option>
          <AutoComplete.Option value="Nairobe (GMT +3:30)"></AutoComplete.Option>
          <AutoComplete.Option value="Dubai (GMT +4:00)"></AutoComplete.Option>
        </AutoComplete>
      </Col>
      <Divider />
      <Col span={24}>
        <MyTypography level={4}>Time Format</MyTypography>
        <DescText>Time format between 12-hour and 24-hour.</DescText>
      </Col>
      <Col span={12}>
        <Select size='large' style={{width: "100%"}} defaultValue={1} placeholder="Time Format">
          <Select.Option value={1}>12-hour</Select.Option>
          <Select.Option value={2}>24-hour</Select.Option>
        </Select>
      </Col>
    </Row>
    </>
  }

  export default GeneralSetting;