import styled from "styled-components";

import Pagination from "../../ui/Pagination";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";

const Table = styled.div`
  border: 1px solid var(--color-gray-200);

  font-size: 1.4rem;
  background-color: var(--color-gray-0);
  border-radius: 7px;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-gray-600);
  padding: 1.6rem 2.4rem;
`;

const Footer = styled.footer`
  background-color: var(--color-gray-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

function BookingTable() {
  const { bookings, count, isLoading } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Table role="table">
      <TableHeader>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </TableHeader>

      {bookings?.map((booking) => (
        <BookingRow key={booking._id} booking={booking} />
      ))}

      <Footer>
        <Pagination count={count} />
      </Footer>
    </Table>
  );
}

export default BookingTable;
