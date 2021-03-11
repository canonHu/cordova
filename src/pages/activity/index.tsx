import React, {} from 'react';
import { View } from '@tarojs/components';
import './index.scss';

interface Iindex {}

const activity = (props: Iindex) => {
  return (
    <View className='activity'>
      活动
    </View>
  );
}
activity.defaultProps = {};
export default activity;