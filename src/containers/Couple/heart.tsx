import { View } from 'src/components/common';
import './styles.scss';

const clsPrefix = 'ctn-couple-heart';

const Heart = () => {
  return (
    <View align="center" justify="center" className={`${clsPrefix}-wrapper my-24 pl-8`}>
      <div className={`${clsPrefix}-heart`} />
    </View>
  );
};

export default Heart;
