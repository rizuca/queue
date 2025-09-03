import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface QueueNode {
  data: number;
  next: QueueNode | null;
}

export function LinkedListQueue() {
  const [front, setFront] = useState<QueueNode | null>(null);
  const [rear, setRear] = useState<QueueNode | null>(null);
  const [size, setSize] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const enqueue = () => {
    if (inputValue.trim() === '') return;
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const newNode: QueueNode = {
      data: value,
      next: null
    };
    
    if (rear === null) {
      setFront(newNode);
      setRear(newNode);
    } else {
      rear.next = newNode;
      setRear(newNode);
    }
    
    setSize(size + 1);
    setInputValue('');
  };

  const dequeue = () => {
    if (front === null) {
      alert('Queue is empty!');
      return;
    }
    
    const newFront = front.next;
    setFront(newFront);
    
    if (newFront === null) {
      setRear(null);
    }
    
    setSize(size - 1);
  };

  const reset = () => {
    setFront(null);
    setRear(null);
    setSize(0);
    setInputValue('');
  };

  // Convert linked list to array for visualization
  const getQueueArray = (): number[] => {
    const result: number[] = [];
    let current = front;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  };

  const queueArray = getQueueArray();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked List Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter number"
            onKeyDown={(e) => e.key === 'Enter' && enqueue()}
          />
          <Button onClick={enqueue}>
            Enqueue
          </Button>
          <Button onClick={dequeue} disabled={size === 0}>
            Dequeue
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
        
        <div className="space-y-2">
          <p>Queue Size: {size}</p>
          <p>Front Value: {front?.data ?? 'N/A'}</p>
          <p>Rear Value: {rear?.data ?? 'N/A'}</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="mb-2">Queue (FIFO - First In, First Out):</p>
          <div className="flex gap-2 min-h-[80px] items-center flex-wrap">
            {queueArray.length === 0 ? (
              <div className="text-gray-500 italic">Queue kosong</div>
            ) : (
              queueArray.map((value, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 h-16 border-2 border-green-300 bg-green-100 rounded flex flex-col items-center justify-center">
                    <div className="font-bold">{value}</div>
                    <div className="text-xs text-gray-600">
                      {index === 0 ? 'Front' : index === queueArray.length - 1 ? 'Rear' : 'Node'}
                    </div>
                  </div>
                  {index < queueArray.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className="w-4 h-0.5 bg-gray-400"></div>
                      <div className="w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-sm space-y-1">
          <p><strong>Cara Kerja:</strong></p>
          <p>• Setiap elemen adalah node dengan data dan pointer ke next</p>
          <p>• Enqueue: Menambah node baru di rear</p>
          <p>• Dequeue: Menghapus node di front</p>
          <p>• Tidak ada batas maksimum (dynamic memory)</p>
        </div>
      </CardContent>
    </Card>
  );
}