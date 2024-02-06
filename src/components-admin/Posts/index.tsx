'use client';

import Pagination from '@/components-admin/Pagination';
import Table from '@/components-admin/Table';

const Posts = () => {
  return (
    <div>
      <Table />
      <Pagination
        totalItemCount={100}
        currentPage={1}
        perPageCount={10}
        onChangePage={(page) => {
          console.log(page);
        }}
      />
    </div>
  );
};

export default Posts;
