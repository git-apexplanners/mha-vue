import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// UI Components
import Button from './components/ui/Button.vue'
import Input from './components/ui/Input.vue'
import Textarea from './components/ui/Textarea.vue'
import Select from './components/ui/Select.vue'
import SelectOption from './components/ui/SelectOption.vue'
import Label from './components/ui/Label.vue'
import Switch from './components/ui/Switch.vue'
import Card from './components/ui/Card.vue'
import CardHeader from './components/ui/CardHeader.vue'
import CardTitle from './components/ui/CardTitle.vue'
import CardContent from './components/ui/CardContent.vue'
import CardFooter from './components/ui/CardFooter.vue'
import Table from './components/ui/Table.vue'
import TableHeader from './components/ui/TableHeader.vue'
import TableBody from './components/ui/TableBody.vue'
import TableRow from './components/ui/TableRow.vue'
import TableHead from './components/ui/TableHead.vue'
import TableCell from './components/ui/TableCell.vue'
import Pagination from './components/ui/Pagination.vue'
import PaginationContent from './components/ui/PaginationContent.vue'
import PaginationItem from './components/ui/PaginationItem.vue'
import PaginationLink from './components/ui/PaginationLink.vue'
import PaginationPrevious from './components/ui/PaginationPrevious.vue'
import PaginationNext from './components/ui/PaginationNext.vue'
import PaginationEllipsis from './components/ui/PaginationEllipsis.vue'
import Skeleton from './components/ui/Skeleton.vue'

const app = createApp(App)

// Register UI components globally
app.component('Button', Button)
app.component('Input', Input)
app.component('Textarea', Textarea)
app.component('Select', Select)
app.component('SelectOption', SelectOption)
app.component('Label', Label)
app.component('Switch', Switch)
app.component('Card', Card)
app.component('CardHeader', CardHeader)
app.component('CardTitle', CardTitle)
app.component('CardContent', CardContent)
app.component('CardFooter', CardFooter)
app.component('Table', Table)
app.component('TableHeader', TableHeader)
app.component('TableBody', TableBody)
app.component('TableRow', TableRow)
app.component('TableHead', TableHead)
app.component('TableCell', TableCell)
app.component('Pagination', Pagination)
app.component('PaginationContent', PaginationContent)
app.component('PaginationItem', PaginationItem)
app.component('PaginationLink', PaginationLink)
app.component('PaginationPrevious', PaginationPrevious)
app.component('PaginationNext', PaginationNext)
app.component('PaginationEllipsis', PaginationEllipsis)
app.component('Skeleton', Skeleton)

app.use(createPinia())
app.use(router)

app.mount('#app')
