require_relative 'bank_account'

class InvestmentAccount < BankAccount
	def withdraw(amount)
	  if (balance + credit_line >= amount)
        @balance -= amount
        log_transaction('Withdrawal', amount)
	  end
	end
  def transfer(account, amount)
	  if (balance + credit_line >= amount + 8)
		  withdraw(amount + 8);
		  account.deposit(amount);
	  else
		  puts "Você não possui saldo suficiente para realizar a transferencia!"
	  end
  end
end
