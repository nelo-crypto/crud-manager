type CrudPaginationResponse = {
    data: User[],
    pagination: {
        total: number,
    }
}