import React from 'react';
import { connect } from 'react-redux';
import { Space, Typography, Button, Pagination, Col, Row } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ListFooterProps, Pagination as TodoPagination, TodoState } from 'common/types';
import { RootState } from 'redux/reducers';
import { filterTodo, paginate } from 'redux/actions';

const { Text } = Typography;

const ListFooter: React.FC<ListFooterProps> = ({
  isFiltered,
  total,
  totalFiltered,
  clearSearch,
  completed,
  pagination,
  paginate
}) => {
  return (
    <Row>
      <Col span={12} style={{ display: 'flex', justifyContent: 'left', alignItems: 'baseline' }}>
        <Space direction='horizontal'>
          <Text>Total: <Text strong>{total}</Text> items.</Text>
          <Text>Completed: <Text strong>{completed}</Text> items.</Text>
          {isFiltered ? <Text>Filtered: <Text strong>{totalFiltered}</Text></Text> : <Text></Text>}
          {isFiltered ? <Button icon={<CloseCircleOutlined />} size='small' onClick={() => clearSearch()}>Reset search</Button> : <></>}
        </Space>
      </Col>
      <Col span={12} style={{ display: 'flex', justifyContent: 'right', alignItems: 'baseline' }}>
        <Pagination
          size='small'
          hideOnSinglePage
          showLessItems
          defaultCurrent={1}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}

          total={total}
          current={pagination.page || 1}
          pageSize={pagination.pageSize}
          onChange={(page, pageSize) => paginate({ page, pageSize })}
        />
      </Col>
    </Row>
  );
};

export default connect((state: RootState) => ({
  pagination: state.paginate,
  total: state.todos.list.length,
  isFiltered: state.todos.filtered,
  completed: state.todos.list.filter(x => x.state === TodoState.Completed).length
}), (dispatch) => ({
  paginate: (pagination: TodoPagination) => dispatch(paginate(pagination)),
  clearSearch: () => dispatch(filterTodo({ keyword: '', type: null, date_from: null, date_to: null }))
}))(ListFooter);