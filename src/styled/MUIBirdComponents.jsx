import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { alpha, styled } from '@mui/material/styles';
import { shadows } from '@mui/system';

const CardStyle = styled(Card)(({ theme }) => ({
  width: 300,
  background: 'white',
  color: '#953553',
  margin: 15,
  boxShadow: 5
}));

export {
  CardStyle
}