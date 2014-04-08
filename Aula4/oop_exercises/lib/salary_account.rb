require_relative 'checking_account'
class SalaryAccount < CheckingAccount
	def initialize
		super
		@monthly_fee = monthly_fee*0.5
	end
	def transfer(account, amount)
	end
end
