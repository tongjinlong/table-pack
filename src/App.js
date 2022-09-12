import './App.css';
import MyTable from './components/myTable';
import { useState } from 'react';
import { jsonToExcel } from './utils/exportExcel.ts'

import {Input, Button} from 'antd'

function App() {
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
      onCell: (row, index) => {
        if (index === 0) {
          return {
            rowSpan: 4,
          }
        }
        return {
          rowSpan: 0,
        }
      }
    },
    {
      title: '系统名称',
      dataIndex: 'systemName',
      key: 'systemName',
      onCell: (row, index) => {
        if(index === 0) return {rowSpan: 1}
        if (index === 1) {
          return {
            rowSpan: 3,
          }
        }
        return {
          rowSpan: 0,
        }
      }
    },
    {
      title: '屏柜名称',
      dataIndex: 'screenName',
      key: 'screenName',
    },
    {
      title: '列入计算的负荷名称',
      dataIndex: 'equipmentName',
      key: 'equipmentName',
    },
    {
      title: '勾选列入计算',
      dataIndex: 'checkCalc',
      key: 'checkCalc',
      render: (text, record, index) => {
        return <Input value={record.checkCalc} placeholder="哈哈哈哈" onChange={(e) => {
          record.checkCalc = e.target.value
          setData([...data])
        }} />
      }
    },
    {
      title: '额定容量（kw）',
      dataIndex: 'ratedPower',
      key: 'ratedPower',
    },
    {
      title: '工作数量（台）',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      onCell: (row, index) => {
        if (index === 0) {
          return {
            rowSpan: 4,
          }
        }
        return {
          rowSpan: 0,
        }
      }
    },
    {
      title: '功率因数',
      dataIndex: 'powerFactor',
      key: 'powerFactor',
    },
    {
      title: '计算电流（A）',
      dataIndex: 'calcCurrent',
      key: 'calcCurrent',
    },
    {
      title: '负荷系数K',
      dataIndex: 'loadFactor',
      key: 'loadFactor',
    },
    {
      title: '计算负荷',
      dataIndex: 'calculatedLoad',
      key: 'calculatedLoad',
      children: [
        {
          title: '计算有功功率 PC（kw）',
          dataIndex: 'activeLoad',
          key: 'activeLoad',
        },
        {
          title: '计算无功功率 QC（kVar）',
          dataIndex: 'noLoad',
          key: 'noLoad',
        },
        {
          title: '计算负荷 SC（kV.A）',
          dataIndex: 'load',
          key: 'load',
        },
      ],
    },
    {
      title: '负荷类型',
      dataIndex: 'loadType',
      key: 'loadType',
      onCell: (row, index) => {
        if (index === 0 || index === 3) {
          return {
            rowSpan: 1,
          }
        }
        if( index === 1) {
          return {
            rowSpan: 2,
          }
        }
        return {
          rowSpan: 0,
        }
      }
    },
  ]

  const [data, setData] = useState([
    {
      id: 1,
      systemName: '系统1',
      screenName: '屏柜1',
      equipmentName: '设备1',
      ratedPower: '额定容量（kw）',
      defaultValue: '工作数量（台）',
      powerFactor: '功率因数',
      calcCurrent: '计算电流（A）',
      loadFactor: '负荷系数K',
      activeLoad: '计算有功功率 PC（kw）',
      noLoad: '计算无功功率 QC（kVar）',
      load: '计算负荷 SC（kV.A）',
      loadType: '负荷类型',
    },
    {
      id: 2,
      systemName: '系统1',
      screenName: '屏柜1',
      equipmentName: '设备1',
      ratedPower: '额定容量（kw）',
      defaultValue: '工作数量（台）',
      powerFactor: '功率因数',
      calcCurrent: '计算电流（A）',
      loadFactor: '负荷系数K',
      activeLoad: '计算有功功率 PC（kw）',
      noLoad: '计算无功功率 QC（kVar）',
      load: '计算负荷 SC（kV.A）',
      loadType: '负荷类型',
    },
    {
      id: 3,
      systemName: '系统1',
      screenName: '屏柜1',
      equipmentName: '设备1',
      ratedPower: '额定容量（kw）',
      defaultValue: '工作数量（台）',
      powerFactor: '功率因数',
      calcCurrent: '计算电流（A）',
      loadFactor: '负荷系数K',
      activeLoad: '计算有功功率 PC（kw）',
      noLoad: '计算无功功率 QC（kVar）',
      load: '计算负荷 SC（kV.A）',
      loadType: '负荷类型',
    },
    {
      id: 4,
      systemName: '系统1',
      screenName: '屏柜1',
      equipmentName: '设备1',
      ratedPower: '额定容量（kw）',
      defaultValue: '工作数量（台）',
      powerFactor: '功率因数',
      calcCurrent: '计算电流',
      loadFactor: '负荷系数K',
      activeLoad: '计算有功功率 PC（kw）',
      noLoad: '计算无功功率 QC（kVar）',
      load: '计算负荷 SC（kV.A）',
      loadType: '负荷类型',
    },
  ])

  const header = {
    id: '序号',
    systemName: '系统名称',
    screenName: '屏幕名称',
    equipmentName: '设备名称',
    checkCalc: '勾选列入计算',
    ratedPower: '额定容量（kw）',
    defaultValue: '工作数量（台）',
    powerFactor: '功率因数',
    calcCurrent: '计算电流（A）',
    loadFactor: '负荷系数K',
    calculatedLoad: '计算负荷',
    activeLoad: '计算有功功率 PC（kw）',
    noLoad: '计算无功功率 QC（kVar）',
    load: '计算负荷 SC（kV.A）',
    loadType: '负荷类型',
  }

  const exportToExcel = () => {
    jsonToExcel({
      header,
      list: data,
      fileName: 'UPS计算书.xlsx',
    })
  }

  return (
    <div className="App">
      <MyTable columns={columns} dataSource={data} id={'test'} />
      <Button onClick={exportToExcel}>导出</Button>
      {/* <Timeout /> */}
    </div>
  );
}

export default App;
