import { View, Text, Picker, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.styl'

export default function Index() {
  const [startDate, setStartDate] = useState<string>('') // 初始化状态为空
  const [days, setDays] = useState<number | null>(null) // 用于存储计算出的天数

  useLoad(() => {
    console.log('Page loaded.')
  })

  const calculateDays = () => {
    if (!startDate) {
      Taro.showToast({ title: '请选择开始日期', icon: 'none' })
      return
    }

    const start = new Date(startDate)
    if (isNaN(start.getTime())) {
      Taro.showToast({ title: '日期格式无效', icon: 'none' })
      return
    }

    const now = new Date()
    const timeDiff = now.getTime() - start.getTime()
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) // 计算持有天数

    setDays(dayDiff) // 更新天数状态
  }

  const handleDateChange = (e: any) => {
    setStartDate(e.detail.value) // 获取选择的日期并更新状态
  }

  return (
    <View className='index'>
      <Text className='title'>物品使用时长计算器</Text>
      <Picker mode='date' onChange={handleDateChange} value={startDate}>
        <View className='picker'>
          {startDate ? `选择日期: ${startDate}` : '请选择开始日期'}
        </View>
      </Picker>
      <Button onClick={calculateDays} className='calculate-button'>
        计算持有天数
      </Button>
      {days !== null && (
        <Text className='result'>
          物品已使用 {days} 天
        </Text>
      )}
    </View>
  )
}
