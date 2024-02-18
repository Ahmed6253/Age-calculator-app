import { useRef, useState } from 'react';
import arrow from '../assets/icon-arrow.svg';

export default function Form({ passDate }) {
  const [dayError, setDayError] = useState();
  const [monthError, setMonthError] = useState();
  const [yearError, setYearError] = useState();
  const day = useRef();
  const month = useRef();
  const year = useRef();

  function submitHandler() {
    let currentDate = new Date();
    //day check
    if (!day.current.value || day.current.value == 0) {
      setDayError('This feild is required');
    } else if (day.current.value > 31) {
      setDayError('Must be a valid day');
    } else setDayError(false);

    //month check
    if (!month.current.value || month.current.value == 0) {
      setMonthError('This feild is required');
    } else if (month.current.value > 12) {
      setMonthError('Must be a valid month');
    } else setMonthError(false);

    //year check
    if (!year.current.value || year.current.value == 0) {
      setYearError('This feild is required');
    } else if (year.current.value > currentDate.getFullYear()) {
      setYearError('Must be in the past');
      return passDate(undefined);
    } else setYearError(false);

    const inputDate = new Date(
      `${month.current.value}-${day.current.value}-${year.current.value}`
    );
    //valid date check
    if (
      day.current.value &&
      inputDate.getDate() != day.current.value &&
      dayError !== 'This feild is required'
    ) {
      setDayError('Must be a valid date');
      return passDate(undefined);
    }

    //pass data if valed
    if (!dayError || !monthError || !yearError) {
      passDate({
        years: currentDate.getFullYear() - inputDate.getFullYear() - 1,
        months:
          currentDate.getDate() > inputDate.getDate()
            ? currentDate.getMonth() + (12 - inputDate.getMonth())
            : currentDate.getMonth() + (12 - inputDate.getMonth()) - 1,
        days:
          currentDate.getDate() > inputDate.getDate()
            ? currentDate.getDate() - inputDate.getDate()
            : 31 - inputDate.getDate() + currentDate.getDate(),
      });
    } else return passDate(undefined);
  }

  //styles
  const inputStyle =
    'border border-lightgray rounded-md sm:text-2xl text-xl p-3 w-full font-bold';
  const inputStyleError =
    'border border-lightred rounded-md sm:text-2xl text-xl p-3 w-full font-bold';
  const lableStyle = 'font-bold text-xs text-smokygray';
  const lableStyleError = 'font-bold text-xs text-lightred';
  //
  return (
    <>
      <div className=" flex sm:w-10/12 w-full gap-5">
        <div className=" flex flex-col w-1/3 gap-2">
          <label
            className={dayError ? lableStyleError : lableStyle}
            htmlFor="DAY"
          >
            DAY
          </label>
          <input
            ref={day}
            className={dayError ? inputStyleError : inputStyle}
            type="number"
            id="DAY"
            name="DAY"
            placeholder="DD"
          />
          {dayError && (
            <p className=" text-[11px] text-lightred italic">{dayError}</p>
          )}
        </div>
        <div className=" flex flex-col w-1/3 gap-2">
          <label
            className={
              monthError || dayError === 'Must be a valid date'
                ? lableStyleError
                : lableStyle
            }
            htmlFor="MONTH"
          >
            MONTH
          </label>
          <input
            ref={month}
            className={
              monthError || dayError === 'Must be a valid date'
                ? inputStyleError
                : inputStyle
            }
            type="number"
            id="MONTH"
            name="MONTH"
            placeholder="MM"
          />
          {monthError && (
            <p className=" text-[11px] text-lightred italic">{monthError}</p>
          )}
        </div>
        <div className=" flex flex-col w-1/3 gap-2">
          <label
            className={
              yearError || dayError === 'Must be a valid date'
                ? lableStyleError
                : lableStyle
            }
            htmlFor="YEAR"
          >
            YEAR
          </label>
          <input
            ref={year}
            className={
              yearError || dayError === 'Must be a valid date'
                ? inputStyleError
                : inputStyle
            }
            type="number"
            id="YEAR"
            name="YEAR"
            placeholder="YYYY"
          />
          {yearError && (
            <p className=" text-[11px] text-lightred italic">{yearError}</p>
          )}
        </div>
      </div>
      <div className="flex items-center w-full text-lightgray">
        <hr className="w-full sm:m-0 my-20" />
        <button
          onClick={submitHandler}
          className="sm:static absolute left-44"
          type="submit"
          value="Submit"
        >
          <img
            className="hover:bg-offblack sm:w-[68px] w-[65px] bg-purple p-4 rounded-full"
            src={arrow}
          />
        </button>
      </div>
    </>
  );
}
