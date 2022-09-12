import React, { useEffect, useState } from 'react'
import './myTable.css'

export default function MyTable(props) {
  const { columns, dataSource } = props

  // 处理columns,查看columns层级
  const [list, setList] = useState([])
  const [columnIndex, setColumnIndex] = useState([])

  // 计算columns的层级
  const getLevel = (columns) => {
    let level = 1
    columns.forEach((item) => {
      if (item.children) {
        level = Math.max(level, getLevel(item.children) + 1)
      }
    })
    return level
  }

  // 计算横向总占比
  const calcColSpan = (columns) => {
    let colSpan = 0
    columns.forEach((item) => {
      if (item.children) {
        colSpan += calcColSpan(item.children)
      } else {
        colSpan += 1
      }
    })
    return colSpan
  }

  const getTHeadData = (column) => {
    if(column.length === 0) return
    let data = []
    // 缓冲数据
    let buffer = []
    column.forEach((item, index) => {
      if (item.children) {
        data.push(item)
        buffer = [...buffer, ...item.children]
      } else {
        data.push(item)
      }
    })
    getTHeadData(buffer)
    if(data.length > 0) {
      let deep = getLevel(data)
      list.unshift({
        deep: deep,
        data: data,
      })
      setList([...list])
    }else{
      return
    }
  }

  // 拿到所有columns的所有dataIndex，如果有子节点，则只拿到所有子节点的dataIndex，如果有render,也拿到render
  const getDataIndex = (columns) => {
    let dataIndex = []
    columns.forEach((item) => {
      if (item.children) {
        dataIndex = [...dataIndex, ...getDataIndex(item.children)]
      } else {
        dataIndex.push({dataIndex: item.dataIndex, render: item.render, onCell: item.onCell})
      }
    })
    return dataIndex
  }

  useEffect(() => {
    getTHeadData(columns);
    const dataIndexs = getDataIndex(columns)
    setColumnIndex(dataIndexs)
  }, [])

  return (
    <table width={'100%'} cellSpacing={0} cellPadding={0}>
        <thead>
          {list.map((el, index) => {
            return <tr key={index}>
            {el.data.map(item => {
              return <td key={item.key} rowSpan={item.children ? 1 : el.deep} colSpan={item.children ? calcColSpan(item.children) : 1}>{item.title}</td>
            })}
          </tr>
          })}
        </thead>
        <tbody>
          {dataSource.map((el, i) => {
            return <tr key={i}>
            {columnIndex.map((item, index) => {
              return (
              (!item.onCell || item.onCell(el, i).rowSpan !== 0) && <td key={`${i}-${index}`} rowSpan={item.onCell ? item.onCell(el, i).rowSpan : 1}>
                {item.render ? item.render(el[item.dataIndex], el) :el[item.dataIndex]}
              </td>
            )})}
          </tr>
          })}
        </tbody>
      </table>
  )
}
