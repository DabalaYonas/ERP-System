import { Badge, Card, Dropdown, Flex, message, Skeleton, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getApplications, getRecruitment, patchApplication } from '../../services/handleRecruitment';
import { EditOutlined, UserOutlined, DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import NewButton from '../../components/NewButton';
import { getStages } from '../../services/handleLookupDatas';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';

const COLORS = ["magenta", "red", "green", "blue", "purple", "lime", "gold", "volcano", "orange", "cyan"];

const ListItem = ({item, index}) => {  
  const items = [
    {
      label: 'Edit Application',
      key: '1',
      icon: <EditOutlined />,
    },
    {
      label: 'View Application',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: 'Delete Application',
      key: '3',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ]  

  const handleDelete = async() => {
    await axios.delete(`http://127.0.0.1:8000/recruitment/application/api/${item.id}/`).then(response => {
      // message.success("Deleted application successfully!");
      window.location.reload();
    }).catch(error => {console.error(error);})
  }

  const onClick = ({ key }) => {
    switch(key) {
      case '1':
        return
      case '2':
        return
      case '3':
        handleDelete(key);
    }    
  }
  return <Draggable key={item.id} draggableId={item.id} index={index}>
    {(provided) => (
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
            <Dropdown menu={{items, onClick}} trigger={["click"]}><MoreOutlined /></Dropdown>
          </Flex>}>
          
        <Flex justify='space-between'>
          <Link to={item.id} className='text-base font-medium'>{item.name}</Link>
          <Tooltip className='cursor-pointer' title={item.status} color={item.status === "Success" ? "green" : item.status === "Error" ? "red" : "gray"}>
            <Badge status={item.status.toLowerCase()} />
          </Tooltip>
        </Flex>
      </Card>
    )}
  </Draggable>
}

const List = ({column, columnId}) => {
  return <div className='my-2 p-3 cursor-default'>
      <h2 className='font-medium text-lg border-b-8 pb-2'>{column.name}</h2>
      <Droppable key={columnId} droppableId={columnId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            width: 280,
            minHeight: 500,
          }}>
          {column.items.map((item, index) => (
            <ListItem key={index} item={item} index={index} />
          ))}
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
    const loadStages = async() => {
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

    loadStages();
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