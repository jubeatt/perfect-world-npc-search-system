import { useRef, useState } from 'react'
import { cloneDeep, flatten } from 'lodash'
import { source } from '../static/data'
import { DELAY } from '../static/constant'
import { SearchValue, SourceKeys, SourceType } from '../types'
import { ColumnsType } from 'antd/es/table'
import { AnyObject } from 'antd/es/_util/type'

export const useContent = () => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState(() => cloneDeep(source))
  const [error, setError] = useState({
    isError: false,
    message: ''
  })

  //// refs
  const initialValues = useRef<SearchValue>({
    missionNPCName: '',
    missionMapName: '',
    targetNPCName: ''
  })

  //// handlers
  function handleSubmit(value: typeof initialValues.current) {
    setError({
      isError: false,
      message: ''
    })
    const { missionNPCName, missionMapName, targetNPCName } = value
    const matchTable = findMatchTable(source, missionNPCName, missionMapName)

    if (!matchTable) {
      setError({
        isError: true,
        message: '找不到對應結果'
      })
      console.error('no match table')
      return null
    }
    const matchPosition = findMatchPosition(matchTable, missionNPCName, missionMapName)
    if (!matchPosition) {
      setError({
        isError: true,
        message: '找不到對應結果'
      })
      console.error('no match position')
      return null
    }

    setLoading(true)

    let searchResult: SourceType[] = []
    if (targetNPCName) {
      const matchResult = matchTable.filter((s) => s.name === targetNPCName)
      searchResult = !matchResult
        ? []
        : [
            {
              name: matchResult[0].name,
              [matchPosition]: matchResult[0][matchPosition]
            }
          ]
    } else {
      searchResult = matchTable.map((row) => {
        return {
          name: row.name,
          [matchPosition]: row[matchPosition]
        }
      })
    }
    // fake delay
    setTimeout(() => {
      setList([searchResult])
      setLoading(false)
    }, DELAY)
  }

  function handleReset() {
    setLoading(true)
    setTimeout(() => {
      setList(cloneDeep(source))
      setLoading(false)
    }, DELAY)
  }

  function findMatchTable(data: SourceType[][], targetName: string, targetMap: string) {
    const copiedData = cloneDeep(data)
    const list = flatten(copiedData)
    const matchTableIndex = list
      .filter((data) => data.name === targetName)
      .findIndex((data) => {
        for (const value of Object.values(data)) {
          if (value === targetMap) {
            return true
          }
        }
      })
    if (matchTableIndex >= 0) {
      return data[matchTableIndex]
    }
    return null
  }

  function findMatchPosition(data: SourceType[], targetName: string, targetMap: string): null | SourceKeys {
    const row = data.find((d) => d.name === targetName)
    if (!row) {
      return null
    }
    for (const [key, value] of Object.entries(row)) {
      if (value === targetMap) {
        return key as SourceKeys
      }
    }
    return null
  }

  function generateColumns(): ColumnsType<AnyObject> {
    const resultColumn: ColumnsType<AnyObject> = []
    const row = list[0][0]

    for (const key of Object.keys(row)) {
      if (key === 'name') {
        resultColumn.push({
          title: 'NPC',
          dataIndex: 'name',
          width: 200
        })
      } else {
        const positionNumber = key.split('position')[1]
        resultColumn.push({
          title: `位置${positionNumber}`,
          dataIndex: `position${positionNumber}`,
          width: 200
        })
      }
    }

    return resultColumn
  }

  return {
    list,
    initialValues,
    error,
    loading,
    handleReset,
    handleSubmit,
    generateColumns
  }
}
