import moment from "moment";
import { webapp } from './webapp.service';

const port = process.env.PORT || 3535;

console.log('|' + ' ✅  ' + moment().format(' h:mm:ss a ') + ' - ' + moment().locale("en").format('MMMM Do YYYY'));

webapp.listen(port, () =>
{
    console.log('|' + ' ✅  ' + moment().format(' h:mm:ss a ') + ' - ' + `App running on port ${port}...`);
});

process.on('unhandledRejection', (err: { name: string, message: string }) =>
{
  console.log('------------------ ERROR ------------------')
  console.log(err.name)
  console.log(err.message)
  console.log('-------------------------------------------')
});
