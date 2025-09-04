import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { StaticArrayQueue } from "./components/StaticArrayQueue";
import { LinkedListQueue } from "./components/LinkedListQueue";
import { CircularQueue } from "./components/CircularQueue";

export default function App() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1>Queue Data Structure Implementation</h1><br>
            <span> Rifqi, Nazwa, Revi, Nuriana </span>span>
          <p className="text-muted-foreground">
            Implementasi Queue dengan Array Statis, Linked List, dan Circular Queue
          </p>
        </div>

        <Tabs defaultValue="static" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="static">Static Array</TabsTrigger>
            <TabsTrigger value="linked">Linked List</TabsTrigger>
            <TabsTrigger value="circular">Circular Queue</TabsTrigger>
          </TabsList>
          
          <TabsContent value="static" className="mt-6">
            <StaticArrayQueue />
          </TabsContent>
          
          <TabsContent value="linked" className="mt-6">
            <LinkedListQueue />
          </TabsContent>
          
          <TabsContent value="circular" className="mt-6">
            <CircularQueue />
          </TabsContent>
        </Tabs>

        <div className="bg-card p-6 rounded-lg border">
          <h3>Perbandingan Implementasi Queue:</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
            <div className="space-y-2">
              <h4 className="text-blue-600">Static Array Queue</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Ukuran tetap (fixed size)</li>
                <li>• Memory allocation statis</li>
                <li>• Sederhana diimplementasikan</li>
                <li>• Memory waste jika tidak penuh</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-green-600">Linked List Queue</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Ukuran dinamis</li>
                <li>• Memory allocation dinamis</li>
                <li>• Tidak ada batas maksimum</li>
                <li>• Extra memory untuk pointer</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-purple-600">Circular Queue</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Penggunaan memory efisien</li>
                <li>• Tidak ada memory waste</li>
                <li>• Implementasi lebih kompleks</li>
                <li>• Front dan rear berputar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
