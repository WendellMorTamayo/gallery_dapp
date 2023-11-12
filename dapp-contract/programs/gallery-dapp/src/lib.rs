use anchor_lang::prelude::*;

declare_id!("2CjtDPsFMaKBHYbqwCiE3NJjA1FMFpWGQWDUZrZP7SEc");

#[program]
pub mod gallery_dapp {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        let base_account: &mut Account<'_, BaseAccount> = &mut ctx.accounts.base_account;
        base_account.authority = ctx.accounts.authority.key();
        base_account.last_gif = 0;
        base_account.gif_count = 0;
        Ok(())
    }

    pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let gif_account = &mut ctx.accounts.gif_account;

        gif_account.authority = ctx.accounts.authority.key();
        gif_account.gif_link = gif_link;
        gif_account.gif_index = base_account.last_gif;
        gif_account.like_count = 0;

        base_account.last_gif = base_account.last_gif.checked_add(1).unwrap();
        base_account.gif_count = base_account.gif_count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn remove_gif(ctx: Context<RemoveGif>, _gif_index: u8) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.gif_count = base_account.gif_count.checked_sub(1).unwrap();

        Ok(())
    }

    pub fn create_like(ctx: Context<CreateLikeAccount>, _gif_index: u8) -> Result<()> {
        let gif_account = &mut ctx.accounts.gif_account;
        gif_account.like_count = gif_account.like_count.checked_add(1).unwrap();

        let gif_like_account = &mut ctx.accounts.gif_like_account;
        gif_like_account.like = 1;
        gif_like_account.authority = ctx.accounts.authority.key();
        gif_like_account.gif_like_index = gif_account.gif_index;

        Ok(())
    }

}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
            init,
            seeds = [b"initialize".as_ref(), authority.key().as_ref()],
            bump,
            payer = authority,
            space = 8 + std::mem::size_of::<BaseAccount>() + 9000,
        )]
    pub base_account: Box<Account<'info, BaseAccount>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct AddGif<'info> {
    #[account(
            mut,
            seeds = [b"initialize".as_ref(), authority.key().as_ref()],
            bump,
            has_one = authority,
        )]
    pub base_account: Box<Account<'info, BaseAccount>>,

    #[account(
            init,
            seeds = [b"gif_state".as_ref(), authority.key().as_ref(), &[base_account.last_gif]],
            bump,
            payer = authority,
            space = 8 + std::mem::size_of::<GifAccount>() + 9000, 
        )]
    pub gif_account: Box<Account<'info, GifAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(gif_index: u8)]
pub struct RemoveGif<'info> {
    #[account(
            mut,
            seeds = [b"initialize".as_ref(), authority.key().as_ref()],
            bump,
            has_one = authority,
        )]
    pub base_account: Box<Account<'info, BaseAccount>>,

    #[account(
            mut,
            close = authority,
            seeds = [b"gif_state".as_ref(), authority.key().as_ref(), &[gif_index].as_ref()],
            bump,
            has_one = authority,
        )]
    pub gif_account: Box<Account<'info, GifAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(gif_index: u8)]
pub struct CreateLikeAccount<'info> {
    #[account(
            mut,
            seeds = [b"gif_state".as_ref(), &[gif_index].as_ref()],
            bump,
        )]
    pub gif_account: Box<Account<'info, GifAccount>>,

    #[account(
        init,
        seeds = [b"like_state".as_ref(), gif_account.authority.as_ref(), &[gif_index].as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<GifLikeAccount>() + 9000,
    )]
    pub gif_like_account: Box<Account<'info, GifLikeAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>, 
}


#[account]
#[derive(Default)]
pub struct BaseAccount {
    pub authority: Pubkey,
    pub gif_count: u8,
    pub last_gif: u8,
}

#[account]
#[derive(Default)]
pub struct GifAccount {
    pub authority: Pubkey,
    pub gif_index: u8,
    pub gif_link: String,
    pub like_count: u8,
}

#[account]
pub struct GifLikeAccount {
    pub authority: Pubkey,
    pub gif_like_index: u8,
    pub like: u8,
}
