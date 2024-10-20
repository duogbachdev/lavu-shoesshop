import handleAPI from '@/apis/handleAPI'
import { ToogleSupplier } from '@/modals'
import { SupplierModel } from '@/models/SupplierModel'
import { Button, message, Modal, Space, Table, Typography } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { Edit2, Sort, UserRemove } from 'iconsax-react'
import { useEffect, useState } from 'react'


const { Text, Title } = Typography
const { confirm } = Modal

const Supplier = () => {
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false)
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [supplierSelected, setSupplierSelected] = useState<SupplierModel>()
  const columns: ColumnProps<SupplierModel>[] = [
    {
      key: 'name',
      title: 'Supplier Name',
      dataIndex: 'name',
    },
    {
      key: 'product',
      title: 'Product',
      dataIndex: 'product',
    },
    {
      key: 'contact',
      title: 'Contact Number',
      dataIndex: 'contact',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'isTaking',
      render: (isTaking: boolean) => <Text type={isTaking ? 'success' : 'danger'}>{isTaking ? 'Taking return' : 'Not taking return'}</Text>
    },
    {
      key: 'active',
      title: 'On The Way',
      dataIndex: 'active',
      render: (num) => num ?? '-'
    },
    {
      key: 'buttonContainer',
      title: 'Action',
      dataIndex: '',
      render: (item: SupplierModel) => <Space>
        <Button onClick={() => {
          setSupplierSelected(item)
          setIsVisibleModalAddNew(true)
        }} type='text' icon={<Edit2 size={18} className='text-info' />} />
        <Button onClick={() => confirm({
          title: 'Confirm',
          content: `Are you sure you want to delete ${item.name}?`,
          onOk: () => deleteSuppler(item._id)
        })} type='text' icon={<UserRemove size={18} className='text-danger' />} />
      </Space>,
      fixed: 'right',
      align: 'center',
    }
  ]

  useEffect(() => {
    getSuppliers()
  }, [])

  const getSuppliers = async () => {
    const api = '/supplier'
    setIsLoading(true)
    try {
      const res = await handleAPI(api)
      res.data && setSuppliers(res.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSuppler = async (id: string) => {
    try {
      // soft delete
      // await handleAPI(`/supplier/update-supplier?id=${id}`, { isDeleted: true }, 'put')

      // delete
      await handleAPI(`/supplier/delete-supplier?id=${id}`, undefined, 'delete')
      getSuppliers()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Table loading={isLoading} dataSource={suppliers} columns={columns} title={() => <div className='row'>
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
      <ToogleSupplier visible={isVisibleModalAddNew} onClose={() => {
        supplierSelected && getSuppliers()
        setIsVisibleModalAddNew(false)
        setSupplierSelected(undefined)
      }} onAddNew={(val) => setSuppliers([...suppliers, val])} supplier={supplierSelected} />
    </div >
  )
}

export default Supplier