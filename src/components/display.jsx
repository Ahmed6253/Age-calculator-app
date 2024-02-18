import CountUp from 'react-countup';

export default function Display({ date }) {
  const years = date?.years;
  const days = date?.days;
  const months = date?.months;
  const h1Styles = 'sm:text-7xl text-5xl text-offblack font-extrabold italic';

  function count(amount) {
    let count = 0;
    setInterval(() => {}, 100);
  }
  return (
    <>
      <h1 className={h1Styles}>
        <span className="text-purple">
          {years ? <CountUp end={years} duration={3} /> : '- -'}
        </span>{' '}
        years
      </h1>
      <h1 className={h1Styles}>
        <span className="text-purple">
          {months ? <CountUp end={months} duration={3} /> : '- -'}
        </span>{' '}
        months
      </h1>
      <h1 className={h1Styles}>
        <span className="text-purple">
          {days ? <CountUp end={days} duration={3} /> : '- -'}
        </span>{' '}
        days
      </h1>
    </>
  );
}
