import { Badge, Card, Dropdown, Flex, message, Modal, Popconfirm, Skeleton, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getApplications, getRecruitment, patchApplication } from '../../services/handleRecruitment';
import { EditOutlined, UserOutlined, DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import NewButton from '../../components/NewButton';
import { getStages } from '../../services/handleLookupDatas';
import PageTitle from '../../components/PageTitle';
import { DescText } from '../../components/DecriptionText';
import API from '../../services/api';

const COLORS = ["magenta", "red", "green", "blue", "purple", "lime", "gold", "volcano", "orange", "cyan"];

const ListItem = ({item, index}) => {  
  const [open, setOpen] = useState(false);
  const items = [
    {
      label: "Refuse",
      key: '1',
    },
    {
      label: <Popconfirm
                title="Delete Application" 
                placement="bottom"
                arrow={false}
                description="Are you sure to delete this application?"
                onConfirm={() => handleDelete()}
                okText="Delete"
                cancelText="Cancel">

             Delete
            
        </Popconfirm>,
      key: '2',
    },
  ]  

  const statusItem = [
    {
      label: <Badge status="success" text="In Progress" />,
      key: '1',
    },
    {
      label: <Badge status="default" text="Ready for Next Stage" />,
      key: '2',
    },
    {
      label: <Badge status="error" size="default" text="Blocked" />,
      key: '3',
    },
  ]

  const handleDelete = async() => {
    await API.delete(`/recruitment/application/api/${item.id}/`).then(response => {
      window.location.reload();
    }).catch(error => {console.error(error);})
  }

  const onClick = ({ key }) => {
    
  }

  return <>
  <Draggable key={item.id} draggableId={item.id} index={index}>
    {(provided) => (
      // <Badge.Ribbon text="HIRED" color='green'>
      <Card
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          userSelect: 'none',
          padding: 0,
          margin: '10px 0 0 0',
          ...provided.draggableProps.style,
        }} 
        title={<Flex justify='space-between'>
            <Tag color={COLORS[item.id % COLORS.length]}>{item.jobPosition}</Tag> 
            <Dropdown className=' cursor-pointer' menu={{items}} trigger={["click"]}><MoreOutlined /></Dropdown>
          </Flex>}>
          
        <Flex justify='space-between'>
          <Link to={item.id} className='text-base font-medium'>{item.name}</Link>
            <Dropdown className='cursor-pointer' menu={{items: statusItem}} trigger={["click"]}>
              <Badge size="default" status={item.status.toLowerCase()} />
            </Dropdown>
        </Flex>
      </Card>
      // </Badge.Ribbon>
    )}
  </Draggable>

  <Modal
    title="Delete Application"
    okText="Delete"
    onCancel={() => {setOpen(false)}}
    open={open}>
      <DescText>Are you sure you want to delete this application?</DescText>
  </Modal>
  
  </>
}

const List = ({column, columnId}) => {  
  return <div className='my-2 p-3 cursor-default' key={columnId} >
      <h2 className='font-medium text-lg border-b-8 pb-2'>{column.name}</h2>
      <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            width: 280,
            minHeight: 500,
          }}>
          {column.items.map((item, index) => {            
            return columnId == 6 ? <Badge.Ribbon text="HIRED" color='green'>
              <ListItem key={index} item={item} index={index} />
            </Badge.Ribbon> : <ListItem key={index} item={item} index={index} />
})}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    </div>
}

function Applications() {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recrtParams, setRecrtParams] = useState(null);
  const {recruitmentID} = useParams();
  const navigate = useNavigate();
  
  const onDragEnd = (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
  
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const stage_id = destination.droppableId;
      const application_id = removed.id;
      
      try {
        patchApplication(application_id, {stage_id: stage_id});
        message.success("Application Stage is updated!");
      } catch (error) {
        console.log(error);
      }
  
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  useEffect(() => { 
    const fetchStages = async() => {
      setLoading(true);
      try {
        const stageDatas = await getStages();
        const applicationDatas = await getApplications();
        const myColums = {};

        stageDatas.forEach(stage => {
          const result = applicationDatas.filter(app => app.recruitment.id == recruitmentID && app.stage_id == stage.id);
          const items = result.map((values) => ({
              id: values.id.toString(), 
              name: values.applicant.name, 
              jobPosition: values.recruitment.job_position_name, 
              status: "Success",
          }));

          myColums[stage.id] = {name: stage.name, items: items};    
          
        });

        const recrt = await getRecruitment(recruitmentID);
        
        setRecrtParams(recrt.job_position_name);          

        setColumns(myColums);            
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    

    fetchStages();
  }, []);

  if (loading) {
    return <Skeleton active />
  }

  return (<>
    <PageTitle title="Applications" items={[
    {
      path: '/recruitment',
      title: 'Recruitment',
    },
    {
      path: `/${recruitmentID}`,
      title: `${recrtParams}`,
    },
  ]} />
    <NewButton onClick={() => {navigate("new-application")}}>New Application</NewButton>

    <DragDropContext onDragEnd={onDragEnd}>
      <Flex className='overflow-y-auto custom-scroll'>
        {Object.entries(columns).map(([columnId, column]) => (
          <List key={columnId} column={column} columnId={columnId}/>
        ))}
      </Flex>
    </DragDropContext>
    </>
  );
}

export default Applications