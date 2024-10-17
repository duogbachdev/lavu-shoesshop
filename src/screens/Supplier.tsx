import React, { useState } from 'react'
import { Button, Space, Table, Typography } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { Sort } from 'iconsax-react'
import { ToogleSupplier } from '@/modals'


const { Title } = Typography

const Supplier = () => {
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false)
  const columns: ColumnProps<any>[] = []
  return (
    <div>
      <Table dataSource={[]} columns={columns} title={() => <div className='row'>
        <div className="col">
          <Title level={5}>Suppliers</Title>
        </div>
        <div className="col text-right">
          <Space>
            <Button className='custom-hover-button' onClick={() => setIsVisibleModalAddNew(true)}>Add Supplier</Button>
            <Button icon={<Sort size={20} color='#5D6679' />} >Filters</Button>
            <Button>Download all</Button>
          </Space>
        </div>
      </div>
      } />
      <ToogleSupplier visible={isVisibleModalAddNew} onClose={() => setIsVisibleModalAddNew(false)} onAddNew={(val) => console.log(val)} />
    </div >
  )
}

export default Supplier