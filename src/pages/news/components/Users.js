import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button,Avatar } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'news/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/news',
      query: { page },
    }));
  }

  function editHandler(id, values,url) {
    values.id = id
    if(url!=null)
    values.url = url
    dispatch({
      type: 'teachers/patch',
      payload:  values ,
    });
  }

  function createHandler(values,url) {
    dispatch({
      type: 'news/createTeacher',
      payload: {values,resp:url}
    });
  }

  const columns = [
    {
      title:'id',
      dataIndex:'id',
      key:'id',
    },
    {
      title:'avatar',
      dataIndex:'avatar',
      key:'avatar',
      render: (text, record) => (
            <Avatar shape="square" size={64} src= {`http://localhost:8002/babyship/download?url=${record.url}`} />
)

      // render:<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler} >
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.news;
  return {
    list,
    total,
    page,
    loading: state.loading.models.news,
  };
}

export default connect(mapStateToProps)(Users);
