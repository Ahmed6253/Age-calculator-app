import Form from './components/form';
import Display from './components/display';
import { useState } from 'react';

function App() {
  const [date, setDate] = useState();
  const getDate = (inputDate) => {
    console.log(inputDate.error);
    setDate(inputDate);
  };
  return (
    <div className="bg-white flex flex-col m-auto p-10 lg:w-6/12 w-11/12 rounded-2xl rounded-br-[160px] ">
      <Form passDate={getDate} />
      <Display date={date || date?.error !== false ? date : undefined} />
    </div>
  );
}

export default App;
