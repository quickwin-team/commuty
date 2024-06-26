import { useSelector } from 'react-redux';
import { TimePicker } from '../components/TimePicker';
import { TypographyH3 } from '../components/TypographyH3';
import { WeekDaysInput } from '../components/WeekDaysInput';
import {
  updateDepartureTime,
  updateReturnTime,
  updateChosenDays,
  selectDepartureTime,
  selectReturnTime,
} from '../store/appReducer';
import { useAppDispatch } from '../store/store';
import AnimateOnRender from "../components/AnimateOnRender.tsx";

type FullDayName = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export const WhenYouAreGoingView = () => {
  const dispatch = useAppDispatch();
  const defaultTimeFrom = useSelector(selectDepartureTime);
  const defaultTimeTo = useSelector(selectReturnTime);

  const handleChosenDaysChange = (weekDaysChosen: Record<FullDayName, boolean>) => {
    const weekDaysChosenMapped = Object.entries(weekDaysChosen);
    const correctWeekDaysChosen = weekDaysChosenMapped
      .map((weekDayChosen) => (weekDayChosen[1] === true ? weekDayChosen[0] : null))
      .filter(Boolean) as FullDayName[];

    dispatch(updateChosenDays(correctWeekDaysChosen));
  };

  const handleDepartureTimeChange = (departureTime: string) => {
    dispatch(updateDepartureTime(departureTime));
  };

  const handleReturnTimeChange = (returnTime: string) => {
    dispatch(updateReturnTime(returnTime));
  };

  return (
      <AnimateOnRender>
    <div className="ml-auto mr-auto p-4 pt-0">
      <TypographyH3 text="Commuting on these days" />
      <WeekDaysInput handleWeekDaysChange={handleChosenDaysChange} />
      <TypographyH3 text="I'm departing to work around" className="mt-8" />
      <TimePicker defaultValue={defaultTimeFrom} setTimePickerTime={handleDepartureTimeChange} />
      <TypographyH3 text="And leaving to home" className="mt-4" />
      <TimePicker defaultValue={defaultTimeTo} setTimePickerTime={handleReturnTimeChange} />
    </div>
      </AnimateOnRender>
  );
};
