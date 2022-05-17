interface TabPanelProps {
  children?: React.ReactNode;
  value: any;
  index: any;
  dir: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, dir, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`${value}`} className="" dir={dir} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

export default TabPanel;
