import React, { Fragment, useEffect, useState } from "react";
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency } from "../../../utils/formatCurrency";
import dayjs from 'dayjs';
import axios from "axios";
import { Skeleton } from "antd";

const Payslip = ({ data }) => {

  const styles = StyleSheet.create({
      page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

      spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },

      container: {width:'100%', flexDirection: 'row', color: "#3E3E3E"},

      titleContainer: {marginTop: 20},
      
      logo: { width: 70 },

      reportTitle: {  fontSize: 16,  textAlign: 'center' },

      addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
      
      title : {fontWeight: 'bold', fontSize: 24},
      
      address : { fontWeight: 400, fontSize: 10},
      
      theader : {fontSize : 10,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

      theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

      tbody:{ fontSize : 9, flex: 1, flexDirection: 'row', gap: 6, paddingTop: 4, paddingLeft: 7, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

      total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

      tbody2:{ flex:2, borderRightWidth:1, },
      tfooter:{ color: "#3b82f6" }
    });

    const PayslipTitle = () => (
      <View style={styles.titleContainer}>
          <Image style={styles.logo} src="/logo_no_txt.png" />
      </View>
    );

    const PayslipName = () => (
      <View style={[styles.container, styles.titleContainer]}>
        <Text style={styles.title}>Salary Slip: {data.employee.name} - {data.payPeriod} </Text>
      </View>
    );

    const EmployeeInfoHead = () => (
      <View style={[styles.container, styles.titleContainer]}>
          <View style={styles.theader}>
              <Text>Employee Information</Text>   
          </View>
          <View style={styles.theader}>
              <Text>Other Information</Text>   
          </View>
      </View>
    );

    const EmployeeInfo = () => (
      <View>
        <View style={styles.container}>
          <View style={styles.tbody}>
            <Text>Name:</Text>
            <Text>{data.employee.name}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>Monthly Wage:</Text>
            <Text>{formatCurrency(data.employee.basic_salary)} Br</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.tbody}>
            <Text>Phone number:</Text>
            <Text>{data.employee.phone_number}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>Pay Period:</Text>
            <Text>{data.payPeriod}</Text>
          </View>
        </View>
        
        <View style={styles.container}>
          <View style={styles.tbody}>
            <Text>Department:</Text>
            <Text>{data.employee.department.name}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>Date Joined</Text>
            <Text>{dayjs(data.employee.date_joined).format("DD/MM/YYYY")}</Text>
          </View>
        </View>
      </View>
    );

    const PayslipHead = () => (
      <View style={[styles.container, styles.titleContainer]}>
          <View style={[styles.theader, styles.theader2]}>
              <Text >Name</Text>   
          </View>
          <View style={styles.theader}>
              <Text>Amount</Text>   
          </View>
          <View style={styles.theader}>
              <Text>Quantity</Text>   
          </View>
          <View style={styles.theader}>
              <Text>Total</Text>   
          </View>
      </View>
    );

    const PayslipBody = () => (
      <View>
        <View style={styles.container}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>Basic Salary</Text>
          </View>
          
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text>{formatCurrency(data.basic_salary)} Br</Text>
          </View>
        </View>
        
        <View style={styles.container}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>Taxable Income</Text>
          </View>

          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text>{formatCurrency(data.taxable_income)} Br</Text>
          </View>
        </View>
        
        <View style={styles.container}>
          <View style={[styles.tbody, styles.tbody2, styles.tfooter]}>
            <Text>Net Pay</Text>
          </View>

          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={[styles.tbody, styles.tfooter]}>
            <Text>{formatCurrency(data.net_salary)} Br</Text>
          </View>
        </View>
      </View>
    );

    const PayslipEnd = () => (
      <View style={[styles.container, styles.titleContainer]}>
          <Text>To Pay on {data.employee.bank_acc} - CBE of {data.employee.name}: {formatCurrency(data.net_salary)} Br</Text>
      </View>
    );

  return <Document>
    <Page size="A4" style={styles.page}>
      <PayslipTitle  />
      <PayslipName/>
      <EmployeeInfoHead />
      <EmployeeInfo />
      <PayslipHead />
      <PayslipBody />
      <PayslipEnd />
    </Page>
  </Document>
  
};

export default Payslip;
