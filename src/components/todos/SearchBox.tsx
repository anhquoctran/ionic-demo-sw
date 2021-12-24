import React, { useState, useEffect } from 'react';
import { DatePicker, Row, Col, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TYPES } from 'common/constants';
import { SearchBoxProps, TodoState } from 'common/types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { filterTodo } from 'redux/actions';
import { RootState } from 'redux/reducers';

const { RangePicker } = DatePicker;

const FullWidthSelectBox = styled(Select)`
  width: 100% !important;
`;

const SearchBox: React.FC<SearchBoxProps> = (props) => {
  const { search, date_from, date_to, type, keyword } = props;
  const [text, setText] = useState<string>(keyword);
  const [todoState, setTodoState] = useState<TodoState>(type);
  const [dates, setSelectedDates] = useState<{ begin?: Date, end?: Date }>({ begin: date_from ?? new Date(), end: date_to });

  const onKeywordChanged = (value: string) => {
    setText(value);
    search({ keyword: value, type: todoState, date_to: dates.end, date_from: dates.begin });
  };

  const onDateChanged = (value: [moment.Moment, moment.Moment]) => {
    const [begin, end] = value;
    setSelectedDates({ begin: begin.toDate(), end: end.toDate() });
    search({ keyword: text, type: todoState, date_to: end.toDate(), date_from: begin.toDate() });
  };

  const onTypeChanged = (value: TodoState) => {
    setTodoState(value);
    search({ keyword: text, type: value, date_to: dates.end, date_from: dates.begin });
  };

  useEffect(() => {
    setText(keyword);
    setTodoState(type);
    setSelectedDates({ begin: date_from, end: date_to });
  }, [date_from, date_to, type, keyword]);

  return (
    <Row gutter={[8, 8]}>
      <Col lg={10} xl={10} md={10} sm={24} xs={24}>
        <Input
          value={text}
          size='large'
          placeholder='Search task item...'
          bordered={false}
          suffix={<SearchOutlined style={{ color: '#ccc' }} />}
          onChange={(event) => onKeywordChanged(event.currentTarget.value)}
          onInput={(event) => onKeywordChanged(event.currentTarget.value)}
          onPaste={(event) => onKeywordChanged(event.currentTarget.value)}
        />
      </Col>
      <Col lg={3} xl={3} md={3} sm={24} xs={24}>
        <FullWidthSelectBox
          placeholder='Select type'
          value={todoState}
          defaultValue={null}
          bordered={false}
          options={TYPES}
          onChange={onTypeChanged}
        />
      </Col >
      <Col lg={6} xl={6} md={6} sm={24} xs={24}>
        <RangePicker bordered={false} allowEmpty={[false, false]} onChange={onDateChanged} />
      </Col>
    </Row>
  );
};

export default connect((state: RootState) => ({
    ...state.todos.filters
  }), {
    search: filterTodo
  })(SearchBox);