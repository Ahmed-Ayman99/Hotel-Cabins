import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import useCabins from "./useCabins";
import CabinRow from "./CabinRow";

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

const CabinTable = () => {
  const { cabins, isLoadin } = useCabins();
  const [searchParams] = useSearchParams();
  const filterVal = searchParams.get("discount") || "all";

  if (isLoadin) return <Spinner />;
  if (!cabins) return null;

  // FILTER Methods
  let filterCabins = cabins;

  if (filterVal === "no-discount")
    filterCabins = filterCabins.filter((cabin) => +cabin.discount === 0);

  if (filterVal === "with-discount")
    filterCabins = filterCabins.filter((cabin) => +cabin.discount > 0);

  // SORT Methods
  const sortVal = searchParams.get("sort") || "name-asc";
  const modifer = sortVal.split("-")[1] === "desc" ? -1 : 1;
  const sortField = sortVal.split("-")[0];

  filterCabins = filterCabins.sort(
    (a, b) => (a[sortField] - b[sortField]) * modifer
  );

  return (
    <Table role="table">
      <TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>

      {filterCabins?.map((cabin) => (
        <CabinRow key={cabin._id} cabin={cabin} />
      ))}
    </Table>
  );
};

export default CabinTable;
