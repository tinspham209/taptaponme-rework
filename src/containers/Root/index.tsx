import React from 'react';
import { connect } from 'react-redux';
import { View } from 'src/components/common';
import { getCoursesAsync } from 'src/redux/coursesRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { Hero, Products, WhatShare, WhyChoose } from './components';
import './styles.scss';

const clsPrefix = 'ctn-root';

const Root: React.FC<Props> = ({ courses, loading, onGetCourses }) => {
  React.useEffect(() => {
    document.title = `TaptapOn.me - Thẻ cá nhân thông minh`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className={`${clsPrefix} full-width pb-48`}>
      <Hero />
      <Products />
      <WhyChoose />
      <WhatShare />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  courses: state.courses.courses.data,
  loading: state.courses.courses.loading,
});

const mapDispatchToProps = {
  onGetCourses: getCoursesAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
