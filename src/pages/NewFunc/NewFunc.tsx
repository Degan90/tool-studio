import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/material';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const categories = [
    {
      value: 'pdf',
      label: 'pdf',
    },
    {
      value: 'converter',
      label: 'converter',
    },
    {
      value: 'resize',
      label: 'resize',
    },
    {
      value: 'game',
      label: 'game',
    },
  ];
export default function NewForm() {
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
        width:800,
        height:600,
        border:"solid black 3px",
        margin:"auto",
        marginTop:10
      }}
      noValidate
      autoComplete="off"
    >
      <Container maxWidth="lg" sx={{ ml:15,marginTop:10 }}>
          <div >
        <TextField
          id="outlined-select-currency"
          select
          label="Category"
          value={currency}
          onChange={handleChange}
          helperText="Please select the category"
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue="Describe your function"
        />
        
        </div>
      </Container>
    </Box>
  );
}