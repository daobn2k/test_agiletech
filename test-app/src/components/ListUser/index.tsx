import { Popconfirm, Space, Tooltip ,Table, notification } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined
  } from "@ant-design/icons/lib/icons";
import { deleteUser, getListUser, IPagition, User } from "../../service/api";
import { useEffect, useState } from "react";
import './index.css';
import FormCrud from "./FormCrud";
interface IListUserProps {
}

interface IDataListUser {
    items:any[],
    count:number

}
const ListUser = (props:IListUserProps) => {
    const {  } = props
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [dataGetUser,setDataGetUser] = useState<IPagition>({
        limit:5,
        page:1
    })
    const [dataListUser,setDataListUser] = useState<IDataListUser>({items:[],count:0})
    const [visible,setVisible] = useState<boolean>(false)
    const [isEdit,setIsEdit] = useState<boolean>(false)
    const [dataUpdate,setDataUpdate] = useState<User>({id:null,name:'',email:'',position:''})
    const columns: any[] = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          align: "center",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          align: "center",
        },
        {
          title: "Position",
          dataIndex: "position",
          key: "position",
          align: "center",
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          render: (_: any, data:User) => (
            <Space size={16}>
              <Tooltip title="Edit">
                <EditOutlined
                  className="ic-edit"
                  onClick={() => onClickEdit(data)}
                />
              </Tooltip>
              <Popconfirm
                title="Are you sure to delete this employee?"
                onConfirm={() => onDelete(data)}
                okText="Delete"
                cancelText="Cancel"
              >
                <Tooltip title="Delete">
                  <DeleteOutlined />
                </Tooltip>
              </Popconfirm>
            </Space>
          ),
        },
    ];


    useEffect(()=>{
        getDataUser(dataGetUser)
    },[dataGetUser])
    const getDataUser = async(params:IPagition) =>{
            setIsLoading(true)
            const result = await getListUser(params);
            const { status ,data} = result
            if(status === 200) {
                setDataListUser(data)
                setIsLoading(false)
            }else{
                notification.error({message:'Get value fail',placement:'topRight'})
                setIsLoading(false)
            }
    }  
  const onClickEdit = (data:User) =>{
    setVisible(true)
    setIsEdit(true)
    setDataUpdate(data)
  }

  const onCancel = ():void =>{
    setVisible(false)

  }

  const onDelete = async(data:User) => {
    const result = await deleteUser(data)
    const { status } = result

    if(status === 200) {
        const payload = {
            limit:1,
            page:5
        }
        getDataUser(payload)
        setIsLoading(false)
    }else{
        notification.error({message:'Xóa thất bại',placement:'topRight'})
        setIsLoading(false)
    }
  }


  const onChangePage = (page:number) =>{
      setDataGetUser({
          ...dataGetUser,
          page:page
      })
  }
  const renderTitle = () =>{
   return isEdit ? 'Edit User' : 'Add User'
  }
  const onClickCreate = () =>{
    setVisible(true)
    setIsEdit(false)
    setDataUpdate({id:null,name:'',email:'',position:''})
  }
  return (
    <div className="root">
        <Table
        columns={columns}
        dataSource={dataListUser.items || []}
        loading={isLoading}
        rowKey="id"
        pagination={{

          total:  dataListUser.count || 0,
          pageSize: 5,
          onChange: onChangePage,
        }}
        footer={
           ()=> <PlusCircleOutlined onClick={onClickCreate} className='icon-add'/>
        }
        />
    <FormCrud title={renderTitle()}isEdit={isEdit} data={dataUpdate} visible={visible} onCancel={onCancel}  getDataUser={getDataUser}/>
    </div>
  )
}

export default ListUser
