import handleAPI from '@/apis/handleAPI'
import { SupplierModel } from '@/models/SupplierModel'
import { replaceName } from '@/utils/replaceName'
import { uploadFile } from '@/utils/uploadFile'
import { Avatar, Button, Form, Input, message, Modal, Select, Typography } from 'antd'
import { User } from 'iconsax-react'
import React, { useEffect, useRef, useState } from 'react'


const { Paragraph } = Typography

interface Props {
  visible: boolean,
  onClose: () => void,
  onAddNew: (val: SupplierModel) => void
  supplier?: SupplierModel,
}

const ToogleSupplier = (props: Props) => {
  const { visible, onClose, onAddNew, supplier } = props

  const [isLoading, setIsLoading] = useState(false)

  const [isTaking, setIsTaking] = useState<boolean>()

  const [file, setFile] = useState<any>()

  const [form] = Form.useForm()
  const inpRef = useRef<any>()

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue(supplier)
      setIsTaking(supplier.isTaking === 1)
    }
  }, [supplier])


  const handleAddNewSupplier = async (value: any) => {
    setIsLoading(true)

    const data: any = {}
    const api = `/supplier/${supplier ? `update-supplier?id=${supplier._id}` : 'add-supplier'}`

    for (const i in value) {
      data[i] = value[i] ?? ''
    }

    data.price = value.price ? parseInt(value.price) : 0

    data.isTaking = isTaking ? 1 : 0

    if (file) {
      data.photoUrl = await uploadFile(file)
    }

    data.slug = replaceName(value.name)

    try {
      const res: any = await handleAPI(api, data, supplier ? 'put' : 'post')
      message.success(res.message)
      !supplier && onAddNew(res.data)
      handleClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.resetFields()
    setFile(undefined)
    onClose()
  }

  return (
    <Modal closable={!isLoading} open={visible} okButtonProps={{ loading: isLoading }} onClose={handleClose} onOk={() => form.submit()} onCancel={handleClose} title={supplier ? 'Update Supplier' : 'New Supplier'} okText={supplier ? 'Update Supplier' : 'Add Supplier'} cancelText='Discard'>
      <label htmlFor="inpFile" className="p-2 mb-3 row">
        {
          file ? <Avatar size={100} src={URL.createObjectURL(file)} /> :
            supplier ? <Avatar size={100} src={supplier.photoUrl} /> :
              <Avatar size={100} style={{ backgroundColor: 'white', border: '1px dashed #9D9D9D' }}>
                <User size={80} color='#777777' />
              </Avatar>
        }

        <div className='ml-3'>
          <Paragraph className='text-muted m-0'>Drag image here</Paragraph>
          <Paragraph className='text-muted mb-2'>Or</Paragraph>
          <Button onClick={() => inpRef.current.click()} type='link'>Browse image</Button>
        </div>
      </label>
      <Form disabled={isLoading} form={form} onFinish={handleAddNewSupplier} layout='horizontal' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} size='large'>
        <Form.Item
          name={'name'}
          label='Supplier Name' rules={[{
            required: true,
            message: 'Please input your supplier name!'
          }]}>
          <Input allowClear placeholder='Entersupplier name' />
        </Form.Item>

        <Form.Item
          name={'product'}
          label='Product'>
          <Input allowClear placeholder='Enter product' />
        </Form.Item>

        <Form.Item
          name={'email'}
          label='Email'>
          <Input allowClear type='email' placeholder='Enter email' />
        </Form.Item>

        <Form.Item
          name={'active'}
          label='Active'>
          <Input allowClear type='number' />
        </Form.Item>

        <Form.Item
          name={'category'}
          label='Category'>
          <Select placeholder='Select product category' options={[]} />
        </Form.Item>

        <Form.Item
          name={'price'}
          label='Buying Price'>
          <Input allowClear placeholder='Enter buying price' type='number' />
        </Form.Item>

        <Form.Item
          name={'contact'}
          label='Contact Number'>
          <Input allowClear placeholder='Enter supplier contact number' />
        </Form.Item>

        <Form.Item
          label='Type'>
          <div className='mb-3'>
            <Button onClick={() => setIsTaking(false)} type={isTaking === false ? 'primary' : 'default'}>Not taking return</Button>
          </div>
          <Button onClick={() => setIsTaking(true)} type={isTaking ? 'primary' : 'default'}>Taking return</Button>
        </Form.Item>
      </Form>
      <div className="d-none">
        <input accept='image/*' ref={inpRef} type="file" name='' id='inpFile' onChange={(val: any) => setFile(val.target.files[0])} />
      </div>
    </Modal>
  )
}

export default ToogleSupplier