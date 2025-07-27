import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Star, 
  MessageCircle, 
  ThumbsUp, 
  Flag,
  Search,
  Filter,
  MoreHorizontal,
  Reply,
  Heart,
  Calendar
} from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  isAnonymous: boolean;
  orderId: string;
  orderDetails: string;
  supplierReply?: string;
  replyDate?: string;
}

interface ReviewsProps {
  onBack: () => void;
}

const Reviews = ({ onBack }: ReviewsProps) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      customerName: "Rajesh Kumar",
      customerAvatar: "/avatars/rajesh.jpg",
      rating: 5,
      comment: "Excellent quality and timely delivery! The basmati rice was exactly as described. Will definitely order again. The packaging was also very good and the price was competitive.",
      date: "2024-01-15",
      helpful: 12,
      isAnonymous: false,
      orderId: "SO156",
      orderDetails: "Basmati Rice - 50kg",
      supplierReply: "Thank you Rajesh! We're glad you're satisfied with our quality. Looking forward to serving you again.",
      replyDate: "2024-01-16"
    },
    {
      id: "2",
      customerName: "Priya Sharma",
      customerAvatar: "/avatars/priya.jpg",
      rating: 4,
      comment: "Good quality onions, fresh and well-packaged. Delivery was on time. The only minor issue was the quantity was slightly less than expected, but overall satisfied.",
      date: "2024-01-14",
      helpful: 8,
      isAnonymous: false,
      orderId: "SO155",
      orderDetails: "Onions - 100kg"
    },
    {
      id: "3",
      customerName: "Anonymous",
      rating: 5,
      comment: "Amazing service! The supplier went above and beyond to ensure we got the best quality tomatoes. Highly recommended for bulk orders.",
      date: "2024-01-13",
      helpful: 15,
      isAnonymous: true,
      orderId: "SO154",
      orderDetails: "Tomatoes - 75kg"
    },
    {
      id: "4",
      customerName: "Amit Patel",
      customerAvatar: "/avatars/amit.jpg",
      rating: 3,
      comment: "The quality was okay but delivery was delayed by 2 hours. The supplier was communicative about the delay though. Price was reasonable.",
      date: "2024-01-12",
      helpful: 3,
      isAnonymous: false,
      orderId: "SO153",
      orderDetails: "Potatoes - 200kg"
    },
    {
      id: "5",
      customerName: "Sneha Gupta",
      customerAvatar: "/avatars/sneha.jpg",
      rating: 5,
      comment: "Perfect experience! Fresh vegetables, competitive pricing, and excellent customer service. This supplier has become our go-to for all bulk orders.",
      date: "2024-01-11",
      helpful: 20,
      isAnonymous: false,
      orderId: "SO152",
      orderDetails: "Mixed Vegetables - 150kg"
    }
  ]);

  const ratingStats = {
    average: 4.4,
    total: reviews.length,
    breakdown: [
      { rating: 5, count: 3, percentage: 60 },
      { rating: 4, count: 1, percentage: 20 },
      { rating: 3, count: 1, percentage: 20 },
      { rating: 2, count: 0, percentage: 0 },
      { rating: 1, count: 0, percentage: 0 }
    ]
  };

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || 
      (filter === 'positive' && review.rating >= 4) ||
      (filter === 'negative' && review.rating < 4);
    
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const handleReply = (reviewId: string) => {
    if (replyText.trim()) {
      // Here you would typically send the reply to your backend
      console.log(`Replying to review ${reviewId}: ${replyText}`);
      setReplyText('');
      setShowReplyForm(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-warning text-warning' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Customer Reviews</h1>
          </div>
          <p className="text-muted-foreground ml-14">
            Manage and respond to customer feedback
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rating Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-warning mb-2">
                    {ratingStats.average}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(ratingStats.average))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {ratingStats.total} reviews
                  </p>
                </div>

                <div className="space-y-3">
                  {ratingStats.breakdown.map((stat) => (
                    <div key={stat.rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-8">
                        <span className="text-sm font-medium">{stat.rating}</span>
                        <Star className="w-3 h-3 fill-warning text-warning" />
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-warning h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground w-8 text-right">
                        {stat.count}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-success">4.8</div>
                      <div className="text-xs text-muted-foreground">This Month</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">+0.4</div>
                      <div className="text-xs text-muted-foreground">vs Last Month</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('all')}
                    >
                      All ({reviews.length})
                    </Button>
                    <Button
                      variant={filter === 'positive' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('positive')}
                    >
                      Positive ({reviews.filter(r => r.rating >= 4).length})
                    </Button>
                    <Button
                      variant={filter === 'negative' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('negative')}
                    >
                      Negative ({reviews.filter(r => r.rating < 4).length})
                    </Button>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest">Highest Rating</SelectItem>
                      <SelectItem value="lowest">Lowest Rating</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div className="space-y-4">
              {sortedReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-soft transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.customerAvatar} />
                        <AvatarFallback>
                          {review.isAnonymous ? 'A' : review.customerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">
                                {review.isAnonymous ? 'Anonymous' : review.customerName}
                              </h4>
                              {review.isAnonymous && (
                                <Badge variant="secondary" className="text-xs">Anonymous</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(review.date)}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Order: {review.orderId} • {review.orderDetails}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-sm leading-relaxed">{review.comment}</p>

                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground"
                            onClick={() => setShowReplyForm(showReplyForm === review.id ? null : review.id)}
                          >
                            <Reply className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <Flag className="w-4 h-4 mr-1" />
                            Flag
                          </Button>
                        </div>

                        {/* Supplier Reply */}
                        {review.supplierReply && (
                          <div className="bg-muted/50 rounded-lg p-4 mt-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-3 h-3 text-primary" />
                              </div>
                              <span className="text-sm font-medium">Supplier Reply</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(review.replyDate!)}
                              </span>
                            </div>
                            <p className="text-sm">{review.supplierReply}</p>
                          </div>
                        )}

                        {/* Reply Form */}
                        {showReplyForm === review.id && (
                          <div className="bg-muted/50 rounded-lg p-4 mt-3">
                            <textarea
                              placeholder="Write your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                              rows={3}
                            />
                            <div className="flex gap-2 mt-3">
                              <Button 
                                size="sm"
                                onClick={() => handleReply(review.id)}
                                disabled={!replyText.trim()}
                              >
                                Send Reply
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setShowReplyForm(null);
                                  setReplyText('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {sortedReviews.length === 0 && (
                <Card>
                  <CardContent className="pt-12 pb-12 text-center">
                    <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search terms
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews; 