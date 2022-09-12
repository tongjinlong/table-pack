import * as xlsx from 'xlsx'

export const jsonToExcel = (options: {
  header: string[],
  list: any[],
  fileName?: string,
}) => {
  const dataMerge = []
  let num = 6
  let mem = 'A'.charCodeAt(0)
  
  const obj: Record<string, any> = {}
  options.list.map((item, index) => {
    num++
    for (const key in item) {
      obj[`${String.fromCharCode(mem)}${num}`] = {t: typeof item[key] === 'string' ? 's' : 'n', v: item[key]}
      // {s: {r: 1, c: 12}, e: {r: 5, c: 12}}
      if(String.fromCharCode(mem) === 'A') {
        if( index === 0 ) {
          dataMerge.push({s: {r: num-1, c: mem-'A'.charCodeAt(0)}, e: {r: num+2 , c: mem-'A'.charCodeAt(0)}})
        }
      }else{
        dataMerge.push({s: {r: num-1, c: mem-'A'.charCodeAt(0)}, e: {r: num-1 , c: mem-'A'.charCodeAt(0)}})
      }
      mem++
    }
    mem = 'A'.charCodeAt(0)
  })
  
  const workSheet = {
    "!ref": `A1:M${num}`,
    A1: {t: 's', v: 'UPS系统负荷计算及容量选择'},
    A2: {t: 's', v: '序号'}, 
    B2: {t: 's', v: '系统名称'}, 
    C2: {t: 's', v: '屏柜名称'}, 
    D2: {t: 's', v: '列入计算的负荷名称'}, 
    E2: {t: 's', v: '额定容量'}, 
    F2: {t: 's', v: '工作数量'}, 
    G2: {t: 's', v: '功率因数'}, 
    H2: {t: 's', v: '计算电流'}, 
    I2: {t: 's', v: '负荷系数'},
    J2: {t: 's', v: '计算负荷'},
    J4: {t: 's', v: '计算有功功率'}, 
    K4: {t: 's', v: '计算无功功率'}, 
    L4: {t: 's', v:'计算负荷'}, 
    M2: {t: 's', v: '负荷类型'},
    ...obj,
  }

  workSheet['!merges'] = [
    {s: {r: 0, c: 0}, e: {r: 0, c: 12}},
    {s: {r: 1, c: 0}, e: {r: 5, c: 0}},
    {s: {r: 1, c: 1}, e: {r: 5, c: 1}},
    {s: {r: 1, c: 2}, e: {r: 5, c: 2}},
    {s: {r: 1, c: 3}, e: {r: 5, c: 3}},
    {s: {r: 1, c: 4}, e: {r: 5, c: 4}},
    {s: {r: 1, c: 5}, e: {r: 5, c: 5}},
    {s: {r: 1, c: 6}, e: {r: 5, c: 6}},
    {s: {r: 1, c: 7}, e: {r: 5, c: 7}},
    {s: {r: 1, c: 8}, e: {r: 5, c: 8}},
    {s: {r: 1, c: 9}, e: {r: 2, c: 11}},
    {s: {r: 3, c: 9}, e: {r: 5, c: 9}},
    {s: {r: 3, c: 10}, e: {r: 5, c: 10}},
    {s: {r: 3, c: 11}, e: {r: 5, c: 11}},
    {s: {r: 1, c: 12}, e: {r: 5, c: 12}},
    ...dataMerge
  ]
  

  // 1. 创建一个工作簿 workbook
  const workBook = xlsx.utils.book_new()
  // 2. 创建工作表 worksheet
  // let workSheet = xlsx.utils.json_to_sheet(refs)

  console.log(workSheet);
  
  
  
  // 3. 将工作表放入工作簿中
  xlsx.utils.book_append_sheet(workBook, workSheet)
  // 4. 生成数据保存
  xlsx.writeFile(workBook, options.fileName || `测试.${new Date().valueOf()}.xlsx`, {
    bookType: 'xlsx'
  })
}

