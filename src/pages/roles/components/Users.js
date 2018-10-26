import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current,designRole }) {
  function deleteHandler(id) {
    dispatch({
      type: 'roles/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/roles',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    values.id = id
    dispatch({
      type: 'roles/patch',
      payload: values ,
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'roles/createUser',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '角色',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '概述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler} designRole = {designRole}>
            <Button type="primary">添加用户</Button>
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
  const { list, total, page ,designRole} = state.roles;
  return {
    list,
    total,
    page,
    designRole,
    loading: state.loading.models.roles,
  };
}

export default connect(mapStateToProps)(Users);
