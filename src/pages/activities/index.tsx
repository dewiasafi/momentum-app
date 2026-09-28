import { Badge, Button, Card } from '@/components/ui'
import { MainLayout } from '@/layouts/MainLayout'

const ActivityPages = () => {

  return (

    <div className="">
      <h1 className="text-xl font-bold text-momentum-900 mb-6">Daftar Aktivitas</h1>
      <Card title="Daftar Pengguna Baru" extra={<Button variant='secondary' size='sm' onClick={() => console.log("Hello")}>Lihat Semua</Button>}>
        <p>Konten di sini...</p>
        <Button variant='primary'>primary</Button>
        <Button variant='secondary'>secondary</Button>
        <Button variant='ghost'>ghost</Button>
        <Button variant='danger'>danger</Button>
<Badge variant="orange">Ok</Badge>
      </Card>
    </div>
  )
}

export default ActivityPages