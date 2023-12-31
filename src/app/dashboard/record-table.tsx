'use client'

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  AppBar,
  Typography,
  TextField,
  InputBase,
  Divider,
  TableFooter,
  TablePagination,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  MenuItem,
  Stack,
  Button,
} from '@mui/material'
import {
  Add,
  Close,
  Delete,
  Edit,
  FirstPage,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  LastPage,
  Search,
} from '@mui/icons-material'
import { ChangeEvent, FormEvent, HTMLProps, useEffect, useState } from 'react'
import moment from 'moment'
import {
  CostType,
  DailyCost,
  TotalDailyCost,
  DailyCostQuery,
  DailyCostGroup,
} from '../api/dailyCost/repositories'
import { DateFormat, FormatDateTimeString, TimeFormat } from '@/utils/format'
import useSWRMutation from 'swr/mutation'
import {
  useCreateRecord,
  useDeleteRecord,
  useUpdateRecord,
} from '../hooks/useRecords'

const cols = ['date', 'cost']
const rowsPerPage = 5
const page = 10

interface CreateUpdateDailyCostPayload extends Omit<DailyCost, 'id'> {
  id?: string
}

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void
}

interface TableRowProps {
  row: TotalDailyCost
  onEdit: (data: DailyCost) => void
  onDelete: (data: DailyCost) => void
}

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'data'> {
  data: DailyCostGroup
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  )
}

const initFormData = (data?: DailyCost) => {
  return {
    name: {
      value: data?.name ?? '',
      error: false,
      required: true,
      errorMessage: 'Please input english only',
      pattern: /\w+/,
    },
    cost: { value: data?.cost ?? 0 },
    type: { value: data?.type ?? CostType.unknown },
    date: {
      value: moment(data?.date).format(DateFormat) ?? '',
      required: true,
      errorMessage: 'required field',
    },
    time: {
      value: moment(data?.date).format(TimeFormat) ?? '',
      required: true,
      errorMessage: 'required field',
    },
  }
}
const RecordForm = (props: {
  value?: DailyCost
  open: boolean
  loading: boolean
  onClose: () => void
  onSubmit: (data: CreateUpdateDailyCostPayload) => void
}) => {
  const [formValue, setFormValue] = useState<{
    [key: string]: {
      value: string | number | CostType
      required?: boolean
      error?: boolean
      errorMessage?: string
      pattern?: RegExp
    }
  }>(initFormData(props.value))

  useEffect(() => {
    setFormValue(initFormData(props.value))
  }, [props.value])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, required } = e.target
    setFormValue({
      ...formValue,
      [name]: {
        ...formValue[name],
        value,
        required,
      },
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let isValid = true

    Object.keys(formValue).forEach((k) => {
      const data = formValue[k]
      const { value, pattern, required } = data
      if (required) {
        data.error = !value
      }

      if (pattern && typeof value === 'string') {
        data.error = value !== value.match(pattern)?.[0]
      }

      if (data.error) {
        isValid = false
      }
    })

    if (isValid) {
      const submitData: CreateUpdateDailyCostPayload = {
        id: props.value?.id,
        name: formValue['name'].value as string,
        cost: formValue['cost'].value as number,
        type: formValue['type'].value as CostType,
        date: new Date(`${formValue['date'].value} ${formValue['time'].value}`),
      }
      props.onSubmit(submitData)
    } else {
      setFormValue({ ...formValue })
    }
  }

  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle>
          Add/Edit Record
          <IconButton
            aria-label='dialog-close'
            sx={{
              position: 'absolute',
              right: 8,
              top: 10,
            }}
            onClick={props.onClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component='form'
            noValidate
            sx={{
              minWidth: '400px',
            }}
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <TextField
                required
                size='small'
                aria-label='record-name'
                label='name'
                placeholder='name'
                name='name'
                value={formValue['name'].value}
                error={formValue['name'].error}
                onChange={handleChange}
                helperText={
                  formValue['name'].error && formValue['name'].errorMessage
                }
              />
              <TextField
                required
                size='small'
                aria-label='record-cost'
                type='number'
                label='cost'
                placeholder='cost'
                name='cost'
                value={formValue['cost'].value}
                error={formValue['cost'].error}
                inputProps={{ min: 0 }}
                onChange={handleChange}
              />
              <TextField
                required
                select
                size='small'
                aria-label='record-type'
                label='type'
                placeholder='type'
                name='type'
                value={formValue['type'].value}
                error={formValue['type'].error}
                onChange={handleChange}
              >
                {Object.keys(CostType).map((value, index) => (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                type='date'
                aria-label='record-datetime'
                size='small'
                name='date'
                value={formValue['date'].value}
                error={formValue['date'].error}
                helperText={
                  formValue['date'].error && formValue['date'].errorMessage
                }
                onChange={handleChange}
              />
              <TextField
                type='time'
                required
                name='time'
                value={formValue['time'].value}
                error={formValue['time'].error}
                helperText={
                  formValue['time'].error && formValue['time'].errorMessage
                }
                onChange={handleChange}
              ></TextField>
              <Button
                type='submit'
                size='small'
                variant='contained'
                className='capitalize bg-sky-600 hover:bg-sky-600'
              >
                New/Update
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

const Row = (props: TableRowProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            size='small'
            aria-label='expand-row'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{props.row.date}</TableCell>
        <TableCell align='right'>{props.row.cost}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open}>
            <Box margin={1}>
              <TableContainer className='max-h-[250px]'>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align='right'>Name</TableCell>
                      <TableCell align='right'>Time</TableCell>
                      <TableCell align='right'>Cost (JPY)</TableCell>
                      <TableCell align='right'>Type</TableCell>
                      <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.row.records?.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell align='right'>{r.name}</TableCell>
                        <TableCell align='right'>
                          {moment(r.date).format(TimeFormat)}
                        </TableCell>
                        <TableCell align='right'>{r.cost}</TableCell>
                        <TableCell align='right'>{r.type}</TableCell>
                        <TableCell align='right'>
                          <IconButton
                            size='small'
                            aria-label='edit-btn'
                            onClick={() => props.onEdit(r)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size='small'
                            aria-label='delete-btn'
                            onClick={() => props.onDelete(r)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function RecordTable(props: Props) {
  const [open, setOpen] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<DailyCost>()

  const { trigger: createRecord } = useCreateRecord()
  const { trigger: updateRecord } = useUpdateRecord()
  const { trigger: deleteRecord } = useDeleteRecord()

  function handleChangePage() {}

  function handleChangeRowsPerPage() {}

  function onSubmitFormRecord(data: CreateUpdateDailyCostPayload) {
    try {
      if (data.id) {
        updateRecord(data as unknown as DailyCost)
      } else {
        createRecord({ ...data, type: data.type ?? CostType.unknown })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setOpen(false)
    }
  }

  function onEditFormRecord(data: DailyCost) {
    setCurrentRecord(data)
    setOpen(true)
  }

  function onDeleteFormRecord(data: DailyCost) {
    if (!data.id) {
      return
    }

    try {
      deleteRecord({ id: data.id })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div {...props}>
        <RecordForm
          value={currentRecord}
          open={open}
          loading={false}
          onClose={() => setOpen(false)}
          onSubmit={onSubmitFormRecord}
        />
        <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
          <Toolbar variant='dense'>
            <Typography variant='h6' color='inherit'>
              Records
            </Typography>

            <div className='text-right w-full'>
              <TextField
                size='small'
                placeholder='keywords'
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <Search />
                    </IconButton>
                  ),
                }}
              />
              <IconButton onClick={() => setOpen(true)}>
                <Add />
              </IconButton>
            </div>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Date</TableCell>
                  <TableCell align='right'>Total Cost (JPY)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(props.data ?? {})?.map((k) => (
                  <>
                    {props.data?.[k] && (
                      <Row
                        key={k}
                        row={props.data?.[k]}
                        onEdit={onEditFormRecord}
                        onDelete={onDeleteFormRecord}
                      ></Row>
                    )}
                  </>
                ))}
              </TableBody>
              {/* <TableFooter className='w-full'>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    // colSpan={3}
                    count={records.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter> */}
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  )
}
