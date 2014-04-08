require_relative 'checking_account'

class StudentAccount < CheckingAccount
	def initialize
		super
		@monthly_fee = 0
		@credit_line = 0
	end
end
