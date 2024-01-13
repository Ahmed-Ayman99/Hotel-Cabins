import styled from "styled-components";

import TodayActivity from "../check-in-out/TodayActivity";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, recentLoading, days } = useRecentBookings();
  const { stays, staysLoading } = useRecentStays();
  const { cabins, isLoadin } = useCabins();

  if (recentLoading || staysLoading || isLoadin) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        stays={stays}
        numDays={days}
        cabinCount={cabins?.length}
      />

      <TodayActivity />
      <DurationChart stays={stays} />
      <SalesChart bookings={bookings} days={days} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
