import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, 
  Send, 
  Smile, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  Search,
  Users,
  Circle
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  };
  timestamp: Date;
  isOwn: boolean;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  role: 'admin' | 'member';
}

interface GroupChatProps {
  onBack: () => void;
  groupId?: string;
}

const GroupChat = ({ onBack, groupId = "AG001" }: GroupChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey everyone! I'm interested in joining this group order for onions.",
      sender: {
        id: "user1",
        name: "Rajesh Kumar",
        avatar: "/avatars/rajesh.jpg",
        isOnline: true
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isOwn: false
    },
    {
      id: "2",
      text: "Welcome Rajesh! We need 3 more members to reach our target.",
      sender: {
        id: "user2",
        name: "Priya Sharma",
        avatar: "/avatars/priya.jpg",
        isOnline: true
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      isOwn: false
    },
    {
      id: "3",
      text: "I can confirm my order for 20kg. What's the delivery timeline?",
      sender: {
        id: "user3",
        name: "Amit Patel",
        avatar: "/avatars/amit.jpg",
        isOnline: false
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      isOwn: false
    },
    {
      id: "4",
      text: "Delivery is scheduled for tomorrow between 2-4 PM. I'll coordinate with the supplier.",
      sender: {
        id: "currentUser",
        name: "You",
        avatar: "/avatars/current.jpg",
        isOnline: true
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      isOwn: true
    },
    {
      id: "5",
      text: "Perfect! I'll be available for pickup. Thanks for organizing this.",
      sender: {
        id: "user4",
        name: "Sneha Gupta",
        avatar: "/avatars/sneha.jpg",
        isOnline: true
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      isOwn: false
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [users] = useState<User[]>([
    {
      id: "currentUser",
      name: "You",
      avatar: "/avatars/current.jpg",
      isOnline: true,
      role: 'admin'
    },
    {
      id: "user1",
      name: "Rajesh Kumar",
      avatar: "/avatars/rajesh.jpg",
      isOnline: true,
      role: 'member'
    },
    {
      id: "user2",
      name: "Priya Sharma",
      avatar: "/avatars/priya.jpg",
      isOnline: true,
      role: 'member'
    },
    {
      id: "user3",
      name: "Amit Patel",
      avatar: "/avatars/amit.jpg",
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 5),
      role: 'member'
    },
    {
      id: "user4",
      name: "Sneha Gupta",
      avatar: "/avatars/sneha.jpg",
      isOnline: true,
      role: 'member'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: {
          id: "currentUser",
          name: "You",
          avatar: "/avatars/current.jpg",
          isOnline: true
        },
        timestamp: new Date(),
        isOwn: true
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const onlineUsers = users.filter(user => user.isOnline).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-6xl h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Onion Group Order</h1>
              <p className="text-sm text-muted-foreground">Group #{groupId} • {onlineUsers} online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex gap-4 min-h-0">
          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Group Chat</CardTitle>
                  <Badge variant="secondary" className="bg-success/20 text-success-foreground">
                    <Circle className="w-2 h-2 mr-1 fill-current" />
                    {onlineUsers} online
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-4 pb-4">
                    {messages.map((message, index) => {
                      const showDate = index === 0 || 
                        formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
                      
                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="text-center my-4">
                              <Badge variant="outline" className="text-xs">
                                {formatDate(message.timestamp)}
                              </Badge>
                            </div>
                          )}
                          <div className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={message.sender.avatar} />
                              <AvatarFallback>
                                {message.sender.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`flex-1 max-w-[70%] ${message.isOwn ? 'text-right' : ''}`}>
                              <div className={`inline-block p-3 rounded-lg ${
                                message.isOwn 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}>
                                <p className="text-sm">{message.text}</p>
                              </div>
                              <div className={`text-xs text-muted-foreground mt-1 ${
                                message.isOwn ? 'text-right' : ''
                              }`}>
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {typingUsers.length > 0 && (
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>...</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="inline-block p-3 rounded-lg bg-muted">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                          if (!isTyping) {
                            setIsTyping(true);
                            // Simulate typing indicator
                            setTimeout(() => setIsTyping(false), 3000);
                          }
                        }}
                        onKeyPress={handleKeyPress}
                        className="pr-12"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User List */}
          <div className="w-80 hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Members ({users.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {user.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{user.name}</p>
                          {user.role === 'admin' && (
                            <Badge variant="outline" className="text-xs">Admin</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {user.isOnline 
                            ? 'Online' 
                            : user.lastSeen 
                              ? `Last seen ${formatTime(user.lastSeen)}`
                              : 'Offline'
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat; 