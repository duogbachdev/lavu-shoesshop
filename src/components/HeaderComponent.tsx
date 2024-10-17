import { Avatar, Button, Input, Space } from 'antd'
import { Notification, SearchNormal1 } from 'iconsax-react'
import React from 'react'

const HeaderComponent = () => {
  return (
    <div className="p-4 row bg-white">
      <div className="col">
        <Input
          placeholder='Search product, supplier, order'
          prefix={<SearchNormal1 className='text-muted' size={20} />}
          style={{ width: '50%' }}
          size='large'
        />
      </div>
      <div className="col text-right">
        <Space>
          <Button type='text' icon={<Notification size={20} color='#5D6679' />} />
          <Avatar src={'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/340649989_240409568493249_489988966219104958_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGxPzRercIoH4Irm2wE1E91baGDc277yKNtoYNzbvvIo3jMUShfeTI834Hb3o5_V5oZhdXIXJ3oE2mZzxG4aB3N&_nc_ohc=VpK67ibOwvoQ7kNvgELy98I&_nc_ht=scontent.fhan2-5.fna&_nc_gid=Afll-DTRoC6B-HepqRemx56&oh=00_AYC7kPw85cmV4_C0ksyzlsTwHU4C1Ud3lw_rPbftKCbiDw&oe=6716EDE2'} size={40} />
        </Space>
      </div>
    </div>
  )
}

export default HeaderComponent