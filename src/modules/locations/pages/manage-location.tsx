
const ManageLocationPage = () => {
  return (
    <div className="flex flex-col gap-6 relative h-full flex-1 px-6">
      <div className="flex flex-col gap-2 absolute top-0 left-0 h-full w-64 border-r border-gray-200 px-2">
        <p className="font-light text-lg text-muted-foreground">
          Manage Location
        </p>
      </div>
      <div className="flex-1 pl-64">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Manage Location 1</h1>
        </div>
      </div>
    </div>
  );
}

export default ManageLocationPage;