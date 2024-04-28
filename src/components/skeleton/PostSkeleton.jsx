import React from 'react'
import { Skeleton } from 'antd'

export const OnePostSkeleton = ({ width, height }) => (
  <div className='flex flex-col items-start justify-start'>
    <div className='mb-5'>
      <Skeleton.Image style={{ width: `${width}px`, height: `${height}px`, }} active />
    </div>
    <Skeleton active />
  </div>
)