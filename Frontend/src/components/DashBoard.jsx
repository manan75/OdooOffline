import { MoreVertical, Settings, History, CreditCard, Users, Hand } from 'lucide-react';

export default function DashBoard() {
  const transactions = [
    {
      id: 1,
      type: 'Restaurant food',
      amount: '$50.23',
      account: 'BOA',
      time: '6:17 PM',
      icon: '🍽️',
      color: 'bg-purple-100'
    },
    {
      id: 2,
      type: 'From Joe',
      amount: '+$500.00',
      account: 'WF',
      time: '4:24 PM',
      icon: '💰',
      color: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'Shopping cashback',
      amount: '$6.15',
      account: 'COG',
      time: '11:21 AM',
      icon: '🛍️',
      color: 'bg-green-100'
    },
    {
      id: 4,
      type: 'For Tom\'s gift',
      amount: '$89.52',
      account: 'GIFT',
      time: '8:32 PM',
      icon: '🎁',
      color: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="max-w-screen mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Greeting Section */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">Hey there, Amy! 👋</h1>
                <p className="text-gray-600">Have a great day! Good luck on your financial journey.</p>
              </div>

              {/* Your Cards Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Your cards</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <MoreVertical className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold">$7,983.82</div>
                      <div className="text-white/80 text-sm">
                        <div>**** **** **** 7497</div>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-xs">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                        </div>
                        <span>06/23</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <MoreVertical className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold">$8,172.28</div>
                      <div className="text-white/80 text-sm">
                        <div>**** **** **** 7334</div>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-xs">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                        </div>
                        <span>06/24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Recent transactions</h2>
                  <button className="text-purple-600 text-sm hover:text-purple-700 transition-colors">
                    See all history
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600">
                    <div>Transaction name</div>
                    <div>Amount</div>
                    <div>Date</div>
                    <div>Time</div>
                    <div>Actions</div>
                  </div>
                  
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${transaction.color} rounded-full flex items-center justify-center text-lg`}>
                          {transaction.icon}
                        </div>
                        <span className="font-medium text-gray-800">{transaction.type}</span>
                      </div>
                      <div className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-gray-800'}`}>
                        {transaction.amount}
                      </div>
                      <div className="text-gray-600">{transaction.account}</div>
                      <div className="text-gray-600">{transaction.time}</div>
                      <div>
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>Show 10 from 50+ Transactions</div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
                    New transfer
                  </button>
                </div>
              </div>
            </div>

            {/* User Profile Sidebar */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    AS
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Amy Smith</h3>
                    <p className="text-sm text-gray-500">Premium</p>
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <div className="text-2xl font-bold text-gray-800">$19,842.12</div>
                  <div className="text-sm text-green-600 font-medium">Activated</div>
                </div>

                <div className="space-y-3">
                  <button className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-purple-600 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span>Account Settings</span>
                  </button>
                  
                  <button className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-purple-600 transition-colors">
                    <History className="w-5 h-5" />
                    <span>Transfer history</span>
                  </button>
                  
                  <button className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-purple-600 transition-colors">
                    <CreditCard className="w-5 h-5" />
                    <span>Transfer settings</span>
                  </button>
                  
                  <button className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-purple-600 transition-colors">
                    <Users className="w-5 h-5" />
                    <span>Open company account</span>
                  </button>
                </div>
              </div>

              {/* Enjoying Finspot Card */}
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Hand className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Enjoying Finspot?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Rate our app in the app store and help us reach even more people.
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Rate us
                    </button>
                  </div>
                </div>
              </div>

              {/* Rating Section */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <p className="text-gray-600 text-sm mb-4">How would you rate us?</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-gray-300 hover:text-yellow-400 text-xl transition-colors">
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}