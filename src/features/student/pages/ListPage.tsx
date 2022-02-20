import { Box, Button, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import studentApi from "api/studentApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectCityList, selectCityMap } from "features/city/citySlice";
import { ListParams, Student } from "models";
import React, { useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { StudentFilters } from "../components/StudentFilters";
import StudentTable from "../components/StudentTable";
import { selectStudentsFilter, selectStudentsList, selectStudentsLoading, selectStudentsPagination, studentActions } from "../studentSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1)
    },

    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(4)
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%'
    }
}))

export default function ListPage() {
    const match = useRouteMatch();
    const history = useHistory();

    const studentList = useAppSelector(selectStudentsList);
    const paginations = useAppSelector(selectStudentsPagination);
    const filter = useAppSelector(selectStudentsFilter);
    const loading = useAppSelector(selectStudentsLoading);
    const listMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);
    

    const dispatch = useAppDispatch();

    const classes = useStyles();

    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter)
        );
    }, [dispatch, filter]);

    const handlePageChange = (e: any, page: number) => {
        dispatch(studentActions.setFilter({
            ...filter,
            _page: page,
        }))
    }

    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterWithDebounce(newFilter));
        
    }

    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
        
    }

    const handleRemoveStudent = async (student: Student) => {
        try {
            await studentApi.remove(student?.id as string);
            toast.success('Delete student successfully!')
            // Trigger to re-fetch student with current filter
            dispatch(studentActions.fetchStudentList(filter));
        } catch (error) {
            console.log("Failed to remove student", error);
            
        }
        
    }

    const handleEditStudent = async (student: Student) => {
        history.push(`${match.url}/${student.id}`)
    }

    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading} />}
            <Box className={classes.titleContainer}>
                <Typography variant="h4">Students</Typography>
                <Link to={`${match.url}/add`} style={{textDecoration: 'none'}}>
                <Button variant="contained" color="primary">
                    Add new student
                </Button>
                </Link>
            </Box>

            <Box mb={3}>
                <StudentFilters filter={filter} cityList={cityList} onChange={handleFilterChange} onSearchChange={handleSearchChange}/>
            </Box>

            {/* StudentTable */}
            <StudentTable studentList={studentList} cityMap={listMap} onEdit={handleEditStudent} onRemove={handleRemoveStudent} />

            {/* Paginations */}
            <Box mt={2} display='flex' justifyContent='center' >
            <Pagination count={Math.ceil(paginations._totalRows / paginations._limit)} 
            page={paginations._page} 
            onChange={handlePageChange} />
            </Box>
        </Box>
    );
}